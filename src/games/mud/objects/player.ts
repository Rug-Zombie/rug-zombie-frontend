import { RoomId } from '../types';
import { roomById } from '../utils';
import Inventory from './inventory';
import Body from '../items/body';
import { ItemId } from './item';

class Player {
    wallet: string;
    
    currentRoom: RoomId = RoomId.CATACOMBS_01;

    spawnPoint: RoomId = RoomId.CATACOMBS_01;

    bodyLocation: RoomId = RoomId.NONE;

    inventory: Inventory = new Inventory();

    load = (wallet: string) => {
        this.wallet = wallet;
        this.currentRoom = this.spawnPoint;
    }

    createBody = () => {
        const body = new Body(ItemId.PLAYER_BODY, 'Player Body');
        const itemlist = this.inventory.storage;
        itemlist.forEach(a => {
            this.inventory.removeItem(a.item, a.quantity);
            body.inventory.addItem(a.item, a.quantity);
        });
        const room = roomById(this.currentRoom);
        room.inventory.addItem(body, 1);
        this.bodyLocation = this.currentRoom;
    }
}

export default Player;