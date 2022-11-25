import { ActivityType, ApplicationCommandDataResolvable, Client, ClientEvents, ClientUser, Collection } from "discord.js"
import { RegisterCommandsOptions } from "../types/client";
import { CommandType } from "../types/commands";
import { Event } from "./events";

import glob from "glob";
import { promisify } from "util";

const globPromise = promisify(glob);

export class ExtendedClient extends Client {

    public commands: Collection<string, CommandType> = new Collection();

    private keys = {
        CLIENT_TOKEN: process.env.CLIENT_TOKEN as string,
        TEST_GUILD: process.env.TEST_GUILD as string 
    }

    constructor() {
        super({
            intents: 7796,
            presence: {
                activities: [{ name: `Many Servers!`, type: ActivityType.Watching }],
            }
        })
    }

    public async init() {
        this.registerModules();
        this.login(this.keys.CLIENT_TOKEN);
    }

    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Registering commands to ${guildId}`);
        } else {
            this.application?.commands.set(commands);
            console.log("Registering global commands");
        }
    }

    async registerModules() {
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(`${__dirname}/../commands/*/*{.ts,.js}`);

        commandFiles.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) return;
            console.log(command);

            this.commands.set(command.name, command);
            slashCommands.push(command);
        });

        this.on("ready", () => {
            this.registerCommands({
                commands: slashCommands,
                guildId: process.env.guildId
            });
        });

        const eventFiles = await globPromise(`${__dirname}/../events/*/*{.ts,.js}`);

        eventFiles.forEach(async (filePath) => {
            const event: Event<keyof ClientEvents> = await this.importFile(filePath);
            
            this.on(event.event, async (...args) => {
                event.run(this, ...args);
            });
        });
    }

}