import { LINE_BREAK_CHAR } from 'games/mud/strings';
import { RoomId } from '../../objects/room/types';
import Entity from '../../objects/entity';
import { EntityId, EntityStats, EntityEquipment } from '../../objects/entity/types';
import Inventory from '../../objects/inventory';
import { ItemId } from '../../objects/item/types';
import Body from '../../items/body';
import { roomById } from '../../utils';

let playerStats : EntityStats;
let playerEquipment : EntityEquipment;

const defaultstats: EntityStats = {
    health: 10,
    strength: 5,
    luck: 1,
    intelligence: 1
}

const defaultequipment: EntityEquipment = {
    weapon: null
}

class Player extends Entity {
    wallet          = '';

    currentroom     = RoomId.CATACOMBS_01;

    spawnPoint      = RoomId.CATACOMBS_01;

    bodyLocation    = RoomId.NONE;

    inventory       = new Inventory();

    stats           = defaultstats;

    equipment       = defaultequipment;

    deaths          = 0;

    constructor() { super(EntityId.PLAYER); }

    load = (wallet: string) => {
        this.wallet = wallet;
        playerStats = defaultstats;
        playerEquipment = defaultequipment;
        this.spawn();
    }

    spawn = () => {
        this.currentroom = this.spawnPoint;
        this.stats.health = playerStats.health;
        this.stats.strength = playerStats.strength;
        this.stats.luck = playerStats.luck;
        this.stats.intelligence = playerStats.intelligence;
        this.equipment.weapon = playerEquipment.weapon;
    }

    handleDeath = () => {
        this.deaths++;
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

    statsOutput = () => {
        let response = `PLAYER STATS ${LINE_BREAK_CHAR}${LINE_BREAK_CHAR}`;
        response += `HEALTH       : ${this.stats.health}${LINE_BREAK_CHAR}`;
        response += `STRENGTH     : ${this.stats.strength}${LINE_BREAK_CHAR}`;
        response += `LUCK         : ${this.stats.luck}${LINE_BREAK_CHAR}`;
        response += `INTELLIGENCE : ${this.stats.intelligence}${LINE_BREAK_CHAR}`;
        response += `DEATHS       : ${this.deaths}${LINE_BREAK_CHAR}${LINE_BREAK_CHAR}`;

        response += `PLAYER EQUIPMENT${LINE_BREAK_CHAR}${LINE_BREAK_CHAR}`;
        response += `WEAPON : ${this.equipment.weapon ? this.equipment.weapon.name : 'NONE'}`;

        return response;
    }
}

export default Player;