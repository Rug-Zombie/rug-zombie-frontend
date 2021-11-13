import Item, { ItemId } from '../objects/item';

class Torch extends Item {
    id = ItemId.TORCH;

    name = 'Torch';

    altName = 'torch';

    description = 'A basic light emitting stick';
    
    shortname = 'torch';
}

export default Torch;