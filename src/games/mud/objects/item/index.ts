import { ItemId, ItemType } from './types';

abstract class Item {
    id = ItemId.NONE;

    type = ItemType.BASIC;

    name = '';

    altName = '';

    description = '';

    shortname = '';

    examineText = '';

    canPickup = true;

    canBeLooted = false;

    canEquip = false;

    isEquipped = false;
}

export default Item;