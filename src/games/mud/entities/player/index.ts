import { RoomId } from '../../objects/room/types';
import Entity from '../../objects/entity';
import { EntityId, EntityStats, EntityEquipment } from '../../objects/entity/types';
import Inventory from '../../objects/inventory';
import { ItemId } from '../../objects/item/types';
import Body from '../../items/body';
import { roomById } from '../../utils';

const defaultstats: EntityStats = {
    health: 10,
    strength: 5,
    luck: 1,
    intelligence: 1
}

const defaultequipment: EntityEquipment = {
    weapon: ItemId.NONE
}

class Player extends Entity {
    wallet          = '';

    currentroom     = RoomId.CATACOMBS_01;

    spawnPoint      = RoomId.CATACOMBS_01;

    bodyLocation    = RoomId.NONE;

    inventory       = new Inventory();

    stats           = defaultstats;

    equipment       = defaultequipment;

    constructor() { super(EntityId.PLAYER); }

    load = (wallet: string) => {
        this.wallet = wallet;
        this.spawn();
    }

    spawn = () => {
        this.currentroom = this.spawnPoint;
        this.stats = defaultstats;
        this.equipment = defaultequipment;
    }

    handleDeath = () => {
        this.createBody();
        this.spawn();
    }

    createBody = () => {
        const body = new Body(ItemId.PLAYER_BODY, 'Player Body');
        const itemlist = this.inventory.storage;
        itemlist.forEach(a => {
            this.inventory.removeItem(a.item, a.quantity);
            body.inventory.addItem(a.item, a.quantity);
        });
        const room = roomById(this.currentroom);
        room.inventory.addItem(body, 1);
        this.bodyLocation = this.currentroom;
    }
}

export default Player;