import { Command } from "../../structures/commands";

export default new Command({
    name: "ping",
    description: "",
    run: async ({ client, interaction }) => {
        interaction.followUp({
            embeds: [{
                title: ":ping_pong: Pong!",
                description: `**WS: \`${Math.round(client.ws.ping)} MS\`**`
            }]
        });
    }
});