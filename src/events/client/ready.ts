import { event } from '../../structures/event'

export default event('ready', ({ log }, client) => {
    log(`Logged in as ${client.user.tag}`)
})