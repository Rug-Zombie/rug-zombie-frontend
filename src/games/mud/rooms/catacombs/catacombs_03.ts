import { RoomInfo, RoomId, CommandProps, ItemId } from "../../types";

const south = (props: CommandProps) => {
    return props.engineCallbacks.roomChange(RoomId.CATACOMBS_02, 'You return back to the dungeon.');
}

const catacombs01: RoomInfo = {
    id: RoomId.CATACOMBS_03,
    isDark: false,
    entryText: 'A long tunnel, with a ladder to the North. There is a small torch attached to the wall. Doesnt look safe to remove. Theres enough light now to look around. Try searching',
    commands: [
        { command: 'south', handler: south }
    ]
}

export default catacombs01;