import { Client } from "discord.js"

export class ExtendedClient extends Client {

    constructor() {
        super({
            intents: 7796
        })
    }

    public async init(token: string) {
        this.login(token);
    }

}