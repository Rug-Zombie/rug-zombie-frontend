import { itemById } from 'games/mud/utils';
import { EntityId, EntityStats, EntityEquipment, ModifyStatsType, EntityCallbacks } from 'games/mud/objects/entity/types';
import { LINE_BREAK_CHAR } from 'games/mud/strings';
import Inventory from 'games/mud/objects/inventory';
import Effect from 'games/mud/objects/effect';
import { ItemId, ItemType } from 'games/mud/objects/item/types';
import Item from 'games/mud/objects/item';
import Weapon from '../item/weapon';

abstract class Entity {
    id          : EntityId;

    effects     : Effect[] = [ ];

    inventory?  : Inventory;

    stats?      : EntityStats;
    
    equipment?  : EntityEquipment;

    constructor(id: EntityId) {
        this.id = id;
    }

    modifyStats = (type: ModifyStatsType, value: number) => {
        if(!this.stats) return;
        switch (type) {
            case ModifyStatsType.STRENGTH:
                this.stats.strength += value;
                if (this.stats.strength < 0) this.stats.strength = 0;
                break;
            default: break;
        }
    }

    callbacks   : EntityCallbacks = {
        modifyStats: this.modifyStats
    }

    processTick = () => {
        const current = this.effects;
        let response = '';
        current.forEach(a => {
            response += a.processTick();
            if (a.remainingTicks === 0) {
                response += a.expireEffect(this.callbacks);
                this.effects = this.effects.filter(b => b.id !== a.id);
            }
        });
        return response;
    }

    applyEffect = (effect: Effect) => {
        const check = this.effects.find(a => a.id === effect.id);
        if (check) return `You already have the ${effect.name} effect${LINE_BREAK_CHAR}`;

        this.effects.push(effect);
        return effect.applyEffect(this.callbacks);
    }

    removeEffect = (effect: Effect) => {
        const check = this.effects.find(a => a.id === effect.id);
        if (!check) return `You do not have the ${effect.name} effect${LINE_BREAK_CHAR}`;

        this.effects = this.effects.filter(a => a.id !== effect.id);
        return check.expireEffect(this.callbacks);
    }

    isEquipped = (id: ItemId) => {
        if (!this.equipment) return false;

        const item = itemById(id);
        if (!item) return false;

        switch (item.type) {
            case ItemType.WEAPON: 
                if (!this.equipment.weapon) return false;
                return this.equipment.weapon.id === id;            
            default: return false;
        }
    }

    equip = (item: Item) => {
        if (!this.equipment) return 'Unable to equip items';
        if (!this.inventory) return 'Unable to equip items';

        const check = this.inventory.storage.find(a => a.item.id === item.id);
        if (!check) return 'You do not have that item';

        switch (item.type) {
            case ItemType.WEAPON:
                if (item instanceof Weapon) {
                    const weapon = item as Weapon;
                    this.equipment.weapon = weapon;
                    check.item.isEquipped = true;
                    return `You have equipped the ${weapon.name}`;
                }

                return '[ERROR] Invalid weapon passed in as weapon';

            default: return 'You cannot equip this'
        }
    }

    unequip = (item: Item) => {
        if (!this.equipment) return 'Unable to unequip items';
        if (!this.inventory) return 'Unable to unequip items';

        const check = this.inventory.storage.find(a => a.item.id === item.id);
        if (!check) return 'You do not have that item';

        switch (item.type) {
            case ItemType.WEAPON:
                if (!this.equipment.weapon) return 'This slot is not equipped';
                if (this.equipment.weapon.id !== item.id) return 'This item is not equipped in this slot';

                if (item instanceof Weapon) {                    
                    this.equipment.weapon = null;
                    check.item.isEquipped = false;
                    return `You have unequipped the ${check.item.name}`;
                }
                return '[ERROR] Invalid weapon passed in as weapon';

            default: return 'You cannot unequip this'
        }
    }
}

export default Entity;