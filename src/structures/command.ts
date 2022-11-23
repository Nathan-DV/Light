import { 
    Command, 
    CommandCategory, 
    CommandExec, 
    CommandMeta 
} from '../types/commands'

export const command = (meta: CommandMeta, category: CommandCategory, exec: CommandExec): Command => {
    return {
        meta,
        category,
        exec,
    }
}