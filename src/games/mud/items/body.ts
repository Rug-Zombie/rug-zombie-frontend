import Item from '../objects/item';
import { ItemId } from '../objects/item/types';
import Inventory from '../objects/inventory';

class Body extends Item {
    altName = 'body';

    description = 'Its a rotting body.';

    shortname = 'body';

    canPickup = false;

    canBeLooted = true;

    inventory = new Inventory();

    constructor(id: ItemId, name: string) {
        super();
        this.id = id;
        this.name = name;
    }
}

export default Body;