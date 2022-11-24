import { 
    Command, 
    CommandExec, 
    CommandMeta 
} from '../types/commands'

export const command = (meta: CommandMeta, exec: CommandExec): Command => {
    return {
        meta,
        exec,
    }
}