import { event } from '../../structures/event'
import { EditReply, Reply } from '../../structures/replies'

export default event('interactionCreate', async (
    {
        log, 
        client
    },
    interaction
) => {
    if (!interaction.isChatInputCommand()) return

    try {
        await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);
        
        if (!command) throw new Error('Command not found ... ')

        await command.exec({
            client, 
            interaction, 
            log(...args) {
                log(`[${command.meta.name}]`, ...args)
            }
        })
    } catch (error) {
        log('[Command Error]', error)

        if (interaction.deferred) 
            return interaction.editReply(
                EditReply.error('Something went wrong :(')
            )
        
        return interaction.reply(
            Reply.error('Something went wrong :(')
        )
    }
})