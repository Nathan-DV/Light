import { Event, EventExec, EventKeys } from '../../types'
import { Client } from 'discord.js'

export const event = <T extends EventKeys>(id: T, exec: EventExec<T>): Event<T> => {
    return {
        id,
        exec,
    }
}

export const registerEvents = (client: Client, events: Event<any>[]): void =>  {
    for (const event of events)
        client.on(event.id, async (...args) => {
            const props = {
                client,
                log: (...args: unknown[]) => console.log(`[${event.id[0].toUpperCase() + event.id.substring(1)} Event]`, ...args)
            }

            try {
                await event.exec(props, ...args)
            } catch (error) {
                props.log('Uncaught Error', error)
            }
        })   
}