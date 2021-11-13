import Item from '../objects/item';
import { ItemId } from '../objects/item/types';

class Torch extends Item {
    id = ItemId.TORCH;

    name = 'Torch';

    altName = 'torch';

    description = 'A basic light emitting stick';
    
    shortname = 'torch';
}

export default Torch;