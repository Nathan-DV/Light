
import {
    ChatInputApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    PermissionResolvable
} from "discord.js";

import { ExtendedClient } from "../structures/client";

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}

interface RunOptions {
    client: ExtendedClient;
    interaction: ExtendedInteraction;
    args: CommandInteractionOptionResolver;
}

type RunFunction = (client: ExtendedClient, options: RunOptions) => any;

export type CommandType = {
    userPermissions?: PermissionResolvable[];
    run: RunFunction;
} & ChatInputApplicationCommandData;