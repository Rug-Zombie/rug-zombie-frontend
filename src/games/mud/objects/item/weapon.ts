import Item from 'games/mud/objects/item';
import { ItemType } from 'games/mud/objects/item/types';

abstract class Weapon extends Item {
    type = ItemType.WEAPON;

    canEquip = true;

    damage = 0;
}

export default Weapon;