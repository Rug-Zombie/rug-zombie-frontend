import Room from '../../objects/room';
import { RoomId, CommandProps } from '../../types';

class Catacombs02 extends Room {
    constructor() {
        super(RoomId.CATACOMBS_02);
        this.entryText = 'The ground is squishy, the air petrid, and pitch black. You hear the moans of other Zombies and creatures. What are they doing down here? Maybe it would help to have a torch or a flashlight?';
        this.commands = [ ]
    }

    south = (props: CommandProps) => {
        return props.engineCallbacks.roomChange(RoomId.CATACOMBS_01, 'You return back through the door.');
    }

    north = (props: CommandProps) => {
        return props.engineCallbacks.roomChange(RoomId.CATACOMBS_03, 'You wander out of the dungeon.');
    }
}

export default Catacombs02;