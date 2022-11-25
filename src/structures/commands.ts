import { CommandType } from "../types/commands";

export class Command {
    constructor(commandOptions: CommandType) {
        Object.assign(this, commandOptions);
    }
}