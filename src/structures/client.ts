import { Client } from "discord.js"

export class ExtendedClient extends Client {

    private keys = {
        CLIENT_TOKEN: process.env.CLIENT_TOKEN as string,
        TEST_GUILD: process.env.TEST_GUILD as string 
    }

    constructor() {
        super({
            intents: 7796
        })
    }

    public async init() {
        this.login(this.keys.CLIENT_TOKEN);
    }

}