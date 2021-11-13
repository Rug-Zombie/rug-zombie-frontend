import Room from "./objects/room";
import Item from './objects/item';

import Catacombs01 from './rooms/catacombs/catacombs_01';
import Catacombs02 from './rooms/catacombs/catacombs_02';
import Catacombs03 from './rooms/catacombs/catacombs_03';
import Catacombs04 from './rooms/catacombs/catacombs_04';

import Torch        from './items/torch';
import RustySpoon   from './items/rustyspoon';
import CatacombsMap from './items/catacombsMap';

export const rooms: Room[] = [ 
    new Catacombs01(),
    new Catacombs02(),
    new Catacombs03(),
    new Catacombs04()
]

export const items: Item[] = [
    new Torch(),
    new RustySpoon(),
    new CatacombsMap()
]