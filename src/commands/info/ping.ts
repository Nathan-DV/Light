import { Command } from "../../structures/commands";

export default new Command({
    name: "ping",
    description: "Check the bot's latency!",
    run: async ({ client, interaction }) => {
        interaction.followUp({
            embeds: [{
                title: ":ping_pong: Pong!",
                color: 0x7ddff,
                description: `**WS: \`${Math.round(client.ws.ping)} MS\`**`
            }]
        });
    }
});