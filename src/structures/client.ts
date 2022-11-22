import { Client, GatewayIntentBits } from 'discord.js'
import events from '../events'

export default class ExtendedClient extends Client {
    
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
    
    private registerEvents() {
        // const events: Event<any>[] = [
        //     ready,
        //     interactionCreate
        // ]

        for (const event of events) {
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
            })   
        }
    }

    private registerCommands() {

    }

}