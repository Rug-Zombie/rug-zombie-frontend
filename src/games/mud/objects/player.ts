import { RoomId } from '../types';
import Inventory from './inventory';

class Player {
    wallet: string;
    
    currentRoom: RoomId = RoomId.CATACOMBS_01;

    inventory: Inventory = new Inventory();

    load = (wallet: string) => {
        this.wallet = wallet;
    }
}

export default Player;