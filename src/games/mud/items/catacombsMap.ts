import Item, { ItemId } from '../objects/item';

class CatacombsMap extends Item {
    id = ItemId.CATACOMBS_MAP;

    name = 'Catacombs Map';

    altName = 'catacombs-map';

    description = 'A map of the catacombs';

    examineText = 'Its a basic map. It only has 3 locations.';
    
    shortname = 'map';
}

export default CatacombsMap;