import { ClientEvents } from "discord.js";
import { ExtendedClient } from "./client";

export class Event<Key extends keyof ClientEvents> {
    constructor(
        public event: Key,
        public run: (client: ExtendedClient, ...args: ClientEvents[Key]) => any
    ) {}
}