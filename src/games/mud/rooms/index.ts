import Room from "../objects/room";
import Catacombs01 from './catacombs/catacombs_01';
import Catacombs02 from './catacombs/catacombs_02';
import Catacombs03 from './catacombs/catacombs_03';
import Catacombs04 from './catacombs/catacombs_04';

const rooms: Room[] = [ 
    new Catacombs01(),
    new Catacombs02(),
    new Catacombs03(),
    new Catacombs04()
]

export default rooms;