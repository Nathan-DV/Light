import { SlashCommandBuilder } from "discord.js";
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check the bots uptime!')

export default command(meta, ({ interaction }) => {
    return interaction.reply({
        ephemeral: false,
        embeds: [{
            title: ":ping_pong: Pong!",
            description: `**WS:** \`${Math.round(interaction.client.ws.ping)} MS\``,
            color: 0x51AEFF
        }]
    })
})