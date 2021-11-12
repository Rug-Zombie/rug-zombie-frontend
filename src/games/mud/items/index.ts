import Item from '../objects/item';
import Torch from './torch';
import RustySpoon from './rustyspoon';
import CatacombsMap from './catacombsMap';

const items: Item[] = [
    new Torch(),
    new RustySpoon(),
    new CatacombsMap()
]

export default items;