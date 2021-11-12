import { ItemId } from '../types';
import Item from '../objects/item';

class CatacombsMap extends Item {
    id = ItemId.CATACOMBS_MAP;

    name = 'Catacombs Map';

    description = 'A map of the catacombs';

    examineText: 'Its a basic map. It only has 3 locations.';
    
    shortname = 'catacombs-map';
}

export default CatacombsMap;