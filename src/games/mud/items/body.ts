import Item, { ItemId } from '../objects/item';
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