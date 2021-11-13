import Weapon from 'games/mud/objects/item/weapon';
import { ItemId } from 'games/mud/objects/item/types';

class RustySpoon extends Weapon {
    id = ItemId.RUSTY_SPOON;

    name = 'Rusty Spoon';

    altName = 'rusty-spoon';

    description = 'The rustiest of spoons';
    
    shortname = 'spoon';

    examineText = 'Its the rustiest of spoons.';

    damage = 1;
}

export default RustySpoon;