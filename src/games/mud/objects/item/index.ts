import { ItemId } from './types';

abstract class Item {
    id = ItemId.NONE;

    name = '';

    altName = '';

    description = '';

    shortname = '';

    examineText = '';

    canPickup = true;

    canBeLooted = false;
}

export default Item;