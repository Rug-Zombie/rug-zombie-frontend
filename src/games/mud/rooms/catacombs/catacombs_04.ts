import Room from '../../objects/room';
import { RoomId, CommandProps } from '../../types';

class Catacombs04 extends Room {
    constructor() {
        super(RoomId.CATACOMBS_04);
        this.entryText = 'You enter the barracks. There are 4 small torches lighting up the room and a table in the corner.';
        this.commands = [
            
        ]
    }

    east = (props: CommandProps) => {
        return props.engineCallbacks.roomChange(RoomId.CATACOMBS_03, 'You head back into the tunnel.');
    }
}

export default Catacombs04;