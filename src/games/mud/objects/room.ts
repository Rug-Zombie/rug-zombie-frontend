import { Command, RoomId } from '../types';
import Inventory from './inventory';

class Room {
    id: RoomId = RoomId.NONE;

    isDark: boolean;

    entryText: string;

    commands: Command[] = [ ];

    inventory: Inventory = new Inventory();

    resetRoom?: any;

    north?: any;

    south?: any;

    east?: any;

    west?: any;

    search?: any;

    constructor(id: RoomId) {
        this.id = id;
    }

    exits = () => {
        let output = 'Exits: [ ';
        if (this.north) output += 'N ';
        if (this.south) output += 'S ';
        if (this.east) output += 'E ';
        if (this.west) output += 'W ';
        output += ']';
        return output;
    }
}

export default Room;