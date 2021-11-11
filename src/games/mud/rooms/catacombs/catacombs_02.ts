import { RoomInfo, RoomId, CommandProps, ItemId } from "../../types";

const south = (props: CommandProps) => {
    return props.engineCallbacks.roomChange(RoomId.CATACOMBS_01, 'You return back through the door.');
}

const north = (props: CommandProps) => {
    return props.engineCallbacks.roomChange(RoomId.CATACOMBS_03, 'You wander out of the dungeon.');
}

const catacombs01: RoomInfo = {
    id: RoomId.CATACOMBS_02,
    isDark: false,
    entryText: 'The ground is squishy, the air petrid, and pitch black. You hear the moans of other Zombies and creatures. What are they doing down here? Maybe it would help to have a torch or a flashlight?',
    commands: [
        { command: 'south', handler: south },
        { command: 'north', handler: north }
    ]
}

export default catacombs01;