import { RoomInfo, RoomId, CommandProps } from "../types";

const look = () => {
    return 'You look around, you see a passage to the north';
}

const north = (props: CommandProps) => {
    return props.engineCallbacks.roomChange(RoomId.TESTROOM1, 'You exit to the north');
}

const entrance: RoomInfo = {
    id: RoomId.ENTRANCE,
    isDark: false,
    entryText: 'You have awakened in a darkened room',
    commands: [
        {
            command: 'look',
            handler: look
        },
        {
            command: 'north',
            handler: north
        }
    ]
}

export default entrance;