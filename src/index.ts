import { config } from 'dotenv'
import { resolve } from 'path'

import { Keys } from './types/keys'
import ExtendedClient from "./structures/client"

config({ path: resolve(__dirname, '..', ".env") })

export const keys: Keys = {
    clientToken: process.env.CLIENT_TOKEN ?? 'nil',
    testGuild: process.env.TEST_GUILD ?? 'nil'
}

if (Object.values(keys).includes('nil')) 
    throw new Error('Not all ENV variables are defined!')

new ExtendedClient().init(keys.clientToken)