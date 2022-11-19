import { 
    Command, 
    CommandCategory, 
    CommandExec, 
    CommandMeta 
} from '../../types'

export const command = (meta: CommandMeta, exec: CommandExec): Command => {
    return {
        meta,
        exec,
    }
}

export const category = (name: string, commands: Command[]): CommandCategory => {
    return {
        name,
        commands,
    }
}