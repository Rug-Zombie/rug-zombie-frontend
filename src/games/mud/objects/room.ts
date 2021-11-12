import { Command, RoomId } from '../types';
import Inventory from './inventory';

class Room {
    id: RoomId = RoomId.NONE;

    isDark: boolean;

    entryText: string;

    commands: Command[] = [ ];

    inventory: Inventory = new Inventory();

    constructor(id: RoomId) {
        this.id = id;
    }
}

export default Room;