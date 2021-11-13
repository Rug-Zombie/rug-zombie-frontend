import { EntityId, EntityStats, EntityEquipment } from './types';
import Inventory from '../inventory';

abstract class Entity {
    id          : EntityId;

    inventory?  : Inventory;

    stats?      : EntityStats;
    
    equipment?  : EntityEquipment;

    constructor(id: EntityId) {
        this.id = id;
    }
}

export default Entity;