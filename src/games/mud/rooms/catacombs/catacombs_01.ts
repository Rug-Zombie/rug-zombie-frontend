import Room from '../../objects/room';
import { CommandProps } from '../../types';
import { RoomId } from '../../objects/room/types';
import { ItemId } from '../../objects/item/types';

class Catacombs01 extends Room {
    clawedDoor: boolean;

    usedTorch: boolean;

    constructor() {
        super(RoomId.CATACOMBS_01);
        this.entryText = 'You are in a dark, dank room. It smells like rotting flesh. It is pitch black. There is a door to the North.';
        this.commands = [
            { command: [ 'claw', 'door' ], handler: this.clawDoor, helpText: 'Clawing at the door may do something fun' },
            { command: [ 'examine', 'wall' ], handler: this.examineWall, helpText: 'Whatever could be there' }
        ]
        this.itemhandlers = [
            { id: ItemId.TORCH, handler: this.useTorch },
            { id: ItemId.RUSTY_SPOON, handler: this.useSpoon }
        ]
        this.roomconnections = [ RoomId.CATACOMBS_02 ]
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