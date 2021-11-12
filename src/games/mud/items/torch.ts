import { ItemId } from '../types';
import Item from '../objects/item';

class Torch extends Item {
    id = ItemId.TORCH;

    name = 'Torch';

    description = 'A basic light emitting stick';
    
    shortname = 'torch';
}

export default Torch;