import { RoomInfo, RoomId, CommandProps, ItemId } from "../types";

let tookKnife = false;

const look = () => {
    if (tookKnife) {
        return 'You look around, you see a passage to the south.';
    }

    return 'You look around, you see a passage to the south and a knife on the floor';
}

const south = (props: CommandProps) => {
    return props.engineCallbacks.roomChange(RoomId.ENTRANCE, 'You exit to the south');
}

const pickupKnife = (props: CommandProps) => {
    if (tookKnife) {
        return 'There are no more knives here';
    }

    props.engineCallbacks.addItem(ItemId.NASTY_KNIFE, 1);
    tookKnife = true;
    return 'You have picked up the nasty knife';
}

const testroom1: RoomInfo = {
    id: RoomId.TESTROOM1,
    entryText: 'You are in test room one',
    isDark: false,
    commands: [
        {
            command: 'look',
            handler: look
        },
        {
            command: 'south',
            handler: south
        },
        {
            command: 'pick up knife',
            handler: pickupKnife
        }
    ]
}

export default testroom1;