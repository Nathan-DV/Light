import { config } from 'dotenv'
import { resolve } from 'path'

import ExtendedClient from "./structures/client"

config({ path: resolve(__dirname, '..', ".env") })
new ExtendedClient().init(process.env.CLIENT_TOKEN as string)