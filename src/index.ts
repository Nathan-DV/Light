import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(__dirname, '..', '.env') })

import { ExtendedClient } from "./structures/client";

new ExtendedClient().init();