import { RoomInfo, RoomId, CommandProps, ItemId } from "../../types";

let clawedDoor = false;
let usedTorch = false;

const clawDoor = () => {
    clawedDoor = true;
    return 'You claw at the door. It comes off the hinges.';
}

const useTorch = (props: CommandProps) => {
    if (!props.engineCallbacks.checkInventory(ItemId.TORCH, 1)) {
        return 'You do not have a torch.';
    }

    usedTorch = true;
    return 'You are in a dark, dank room. It smells like rotting flesh. There seems to be something scrawled on the wall. Try to examine it';
}

const useSpoon = (props: CommandProps) => {
    if (!props.engineCallbacks.checkInventory(ItemId.RUSTY_SPOON, 1)) {
        return 'You do not have a spoon.';
    }

    return 'You dig in the dirt. Nothing happens.';
}

const examineWall = () => {
    if (!usedTorch) {
        return 'Its too dark to see.';
    }

    return 'Who are they above the surface? Dont believe the lies. They want to keep you desperate and alone. Seek to get above.  -Alpha';
}

const north = (props: CommandProps) => {
    if (clawedDoor) {
        return props.engineCallbacks.roomChange(RoomId.CATACOMBS_02, 'You exit through the door to the North.');
    }
    
    return 'You feel a wooden door. It is jammed shut. Hmm. Maybe you can claw at it?';
}

const catacombs01: RoomInfo = {
    id: RoomId.CATACOMBS_01,
    isDark: false,
    entryText: 'You are in a dark, dank room. It smells like rotting flesh. It is pitch black. There is a door to the North.',
    commands: [
        { command: 'claw door', handler: clawDoor },
        { command: 'north', handler: north },
        { command: 'use torch', handler: useTorch },
        { command: 'examine wall', handler: examineWall },
        { command: 'use spoon', handler: useSpoon }
    ]
}

export default catacombs01;