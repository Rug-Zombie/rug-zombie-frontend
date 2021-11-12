import { ItemId } from '../types';
import Item from '../objects/item';

class RustySpoon extends Item {
    id = ItemId.RUSTY_SPOON;

    name = 'Rusty Spoon';

    description = 'The rustiest of spoons';
    
    shortname = 'rusty-spoon';
}

export default RustySpoon;