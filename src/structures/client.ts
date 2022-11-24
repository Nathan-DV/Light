import { ApplicationCommandDataResolvable, Client, Collection, GatewayIntentBits } from 'discord.js'
import { Command } from "../types/commands"
import { Event } from "../types/events"
import { RegisterCommandsOptions } from "../types/client"
import { promisify } from "util";

import glob from 'glob';

const globPromise = promisify(glob);

export default class ExtendedClient extends Client {

    private commands: Collection<string, Command> = new Collection();

    constructor() {
        super({ intents: [ 
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers 
        ] })
    }

    public init(token: string) {
        this.registerEvents()
        this.registerCommands()

        this.login(token)
            .catch(err => { 
                console.error('[Login Error]', err) 
                process.exit(1)
            })
    }
    
    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    private async registerEvents() {
        const eventFiles = await globPromise(`${__dirname}/../events/*/*{.ts,.js}`);

        eventFiles.forEach(async (filePath) => {
            const event: Event<any> = await this.importFile(filePath);

            this.on(event.id, async (...args) => {
                const props = {
                    client: this,
                    log: (...args: unknown[]) => console.log(`[${event.id[0].toUpperCase() + event.id.substring(1)} Event]`, ...args)
                }

                try {
                    await event.exec(props, ...args)
                } catch (error) {
                    props.log('Uncaught Error', error)
                }
            });
        });
    }

    async deployCommands({ commands, guildId }: RegisterCommandsOptions) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Registering commands to ${guildId}`);
        } else {
            this.application?.commands.set(commands);
            console.log("Registering global commands");
        }
    }

    private async registerCommands() {
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(`${__dirname}/../commands/*/*{.ts,.js}`);

        commandFiles.forEach(async (filePath) => {
            const command: Command = await this.importFile(filePath);
            if (!command.meta.name) return;
            console.log(command);

            this.commands.set(command.meta.name, command);
            slashCommands.push(command.meta);
        });

        this.on("ready", () => {
            this.deployCommands({
                commands: slashCommands,
                guildId: process.env.TEST_GUILD
            });
        });
    }

}