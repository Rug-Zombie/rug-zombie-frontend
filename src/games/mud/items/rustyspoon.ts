import Item, { ItemId } from '../objects/item';

class RustySpoon extends Item {
    id = ItemId.RUSTY_SPOON;

    name = 'Rusty Spoon';

    altName = 'rusty-spoon';

    description = 'The rustiest of spoons';
    
    shortname = 'spoon';

    examineText = 'Its the rustiest of spoons.';
}

export default RustySpoon;