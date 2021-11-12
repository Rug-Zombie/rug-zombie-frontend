import { ItemId } from '../types';
import Item from '../objects/item';

class CatacombsMap extends Item {
    id = ItemId.CATACOMBS_MAP;

    name = 'Catacombs Map';

    description = 'A map of the catacombs';
    
    shortname = 'catacombs-map';
}

export default CatacombsMap;