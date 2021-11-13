import { Command } from 'games/mud/types';
import { RoomId } from './types';
import Inventory from '../inventory';
import { ItemId, ItemHandler } from '../item/types';

abstract class Room {
    id = RoomId.NONE;

    entryText: string;

    commands: Command[] = [ ];

    inventory = new Inventory();

    itemhandlers: ItemHandler[] = [ ];

    roomconnections: RoomId[] = [ ];

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

    bodies = () => {
        let output = '';
        const playerbody = this.inventory.storage.find(a => a.item.id === ItemId.PLAYER_BODY);
        if (playerbody) output += 'Your body is here. Because you died. Better loot it and get your stuff back.<br />';
        const enemybody = this.inventory.storage.find(a => a.item.id === ItemId.ENEMY_BODY);
        if (enemybody) output += 'There are dead enemies here to be looted<br />';
        return output;
    }
}

export default Room;