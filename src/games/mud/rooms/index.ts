import Room from "../objects/room";
import Catacombs01 from './catacombs/catacombs_01';
import Catacombs02 from './catacombs/catacombs_02';
import Catacombs03 from './catacombs/catacombs_03';

const rooms: Room[] = [
    new Catacombs01(),
    new Catacombs02(),
    new Catacombs03()
]

export default rooms;