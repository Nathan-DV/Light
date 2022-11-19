import { Event } from '../types'
import ready from './client/ready'
import interactionCreate from './server/interactionCreate'

const events: Event<any>[] = [
    ready
]

export default events