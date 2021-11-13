import { RoomId, Command, ReturnCodes, CommandResponse } from './types';
import { ItemId } from './objects/item';
import { rooms, items } from './config';

export const roomById = (id: RoomId) => { return rooms.find(a => a.id === id); }
export const itemById = (id: ItemId) => { return items.find(a => a.id === id); }
export const itemByName = (name: string) => { return items.find(a => name.includes(a.name) || name.includes(a.shortname)); }

export const findCommandMatch = (input: string, choices: Command[]) => {
    const response: CommandResponse = { returncode: ReturnCodes.NO_MATCH, matched: null };
    const shortcut = choices.filter(a => a.shortcut).find(a => a.shortcut === input);
    
    if (shortcut) {
        response.matched = shortcut;
        response.returncode = ReturnCodes.OK;
        return response;
    }

    const commands = input.split(' ');
    let currentOptions = choices;

    for (let i = 0; i <= commands.length; i++) {
        currentOptions = currentOptions.filter(a => a.command.length > i);
        if (currentOptions.length === 0) {
            break;
        }

        const options = currentOptions.filter(a => a.command[i].startsWith(commands[i]));
        if (options.length === 0) {
            break;
        }

        if (options.length > 1) {
            const check = currentOptions.filter(a => a.command[i] === commands[i]);
            if (check.length !== 1) {
                response.returncode = ReturnCodes.AMBIGUOUS_MATCH;
                break;
            }
        }

        if (options[0].command.length === i + 1) {
            response.matched = options[0];
            response.returncode = ReturnCodes.OK;
            break;
        }
    }

    return response;
}