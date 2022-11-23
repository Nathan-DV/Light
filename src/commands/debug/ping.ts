import { SlashCommandBuilder } from "discord.js";
import { command } from '../../structures/command'

const meta = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check the bots uptime!')

export default command(meta, { name: "" }, ({ interaction }) => {
    return interaction.reply({
        ephemeral: false,
        embeds: [{
            title: ":ping_pong: Pong!",
            description: `**WS:** \`${Math.round(interaction.client.ws.ping)} MS\``,
            color: 0x51AEFF
        }]
    })
})