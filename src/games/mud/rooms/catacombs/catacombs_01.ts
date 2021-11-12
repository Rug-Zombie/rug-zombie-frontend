import Room from '../../objects/room';
import { RoomId, CommandProps, ItemId } from '../../types';

class Catacombs01 extends Room {
    clawedDoor: boolean;

    usedTorch: boolean;

    constructor() {
        super(RoomId.CATACOMBS_01);
        this.entryText = 'You are in a dark, dank room. It smells like rotting flesh. It is pitch black. There is a door to the North.';
        this.commands = [
            { command: 'claw door', handler: this.clawDoor },            
            { command: 'use torch', handler: this.useTorch },
            { command: 'examine wall', handler: this.examineWall },
            { command: 'use spoon', handler: this.useSpoon }
        ]
    }

    resetRoom = () => {
        this.usedTorch = false;
    }

    north = (props: CommandProps) => {
        if (this.clawedDoor) {
            return props.engineCallbacks.roomChange(RoomId.CATACOMBS_02, 'You exit through the door to the North.');
        }
        
        return 'You feel a wooden door. It is jammed shut. Hmm. Maybe you can claw at it?';
    }

    clawDoor = () => {
        this.clawedDoor = true;
        return 'You claw at the door. It comes off the hinges.';
    }

    useTorch = (props: CommandProps) => {
        if (!props.engineCallbacks.checkPlayerInventory(ItemId.TORCH, 1)) {
            return 'You do not have a torch.';
        }
    
        this.usedTorch = true;
        return 'You are in a dark, dank room. It smells like rotting flesh. There seems to be something scrawled on the wall. Try to examine it';
    }

    useSpoon = (props: CommandProps) => {
        if (!props.engineCallbacks.checkPlayerInventory(ItemId.RUSTY_SPOON, 1)) {
            return 'You do not have a spoon.';
        }
    
        return 'You dig in the dirt. Nothing happens.';
    }

    examineWall = () => {
        if (!this.usedTorch) {
            return 'Its too dark to see.';
        }
    
        return 'Who are they above the surface? Dont believe the lies. They want to keep you desperate and alone. Seek to get above.  -Alpha';
    }
}

export default Catacombs01;