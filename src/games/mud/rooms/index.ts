import { RoomInfo } from "../types";
import entrance from './entrance';
import testroom1 from './testroom1';
import catacombs01 from './catacombs/catacombs_01';
import catacombs02 from './catacombs/catacombs_02';
import catacombs03 from './catacombs/catacombs_03';

const rooms: RoomInfo[] = [
    catacombs01,
    catacombs02,
    catacombs03,
    entrance,
    testroom1
]

export default rooms;