import { CommandInteractionOptionResolver } from "discord.js";
import { Event } from "../../structures/events";
import { ExtendedInteraction } from "../../types/commands";

export default new Event("interactionCreate", async (client, interaction) => {
    if (interaction.isCommand()) {
        await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);

        if (!command) throw new Error("Could not find command ...");

        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        });
    }
});