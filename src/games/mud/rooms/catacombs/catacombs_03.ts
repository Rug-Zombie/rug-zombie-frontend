import Room from '../../objects/room';
import { RoomId, CommandProps, ItemId } from '../../types';

class Catacombs03 extends Room {
    constructor() {
        super(RoomId.CATACOMBS_03);
        this.entryText = 'A long tunnel, with a ladder to the North. There is a small torch attached to the wall. Doesnt look safe to remove. Theres enough light now to look around. Try searching. Exits [N S E W]';        
        this.inventory.addItem(ItemId.RUSTY_SPOON, 1);
        this.inventory.addItem(ItemId.CATACOMBS_MAP, 1);
        this.commands = [
            { command: 'south', handler: this.south },
            { command: 'east', handler: this.east },
            { command: 'west', handler: this.west },
            { command: 'north', handler: this.north },
            { command: 'search', handler: this.search },
            { command: 'take map', handler: this.takeMap },
            { command: 'take spoon', handler: this.takeSpoon }
        ]
    }

    dataLabResponse = (props: CommandProps) => {
        if (props.input === 'yes') {
            return 'You hear screams from inside, however. you can’t go that way, you don’t have the special keycard. Who does? An intern?';
        }

        return 'You did not type yes to enter the Data Lab.';
    }

    openHatchResponse = (props: CommandProps) => {
        if (props.input === 'yes') {
            return 'You hear screams from inside, however. you can’t go that way, you don’t have the special keycard. Who does? An intern?';
        }

        return 'You did not type yes to open the hatch.';
    }

    south = (props: CommandProps) => {
        return props.engineCallbacks.roomChange(RoomId.CATACOMBS_02, 'You return back to the dungeon.');
    }

    east = (props: CommandProps) => {
        props.engineCallbacks.requestResponse(this.dataLabResponse);
        return 'Are you sure you want to enter the Data Lab?';
    }

    west = (props: CommandProps) => {
        return props.engineCallbacks.roomChange(RoomId.CATACOMBS_04, 'You wander out of the tunnel.');
    }

    north = (props: CommandProps) => {
        if (props.engineCallbacks.checkPlayerInventory(ItemId.RUSTY_SPOON, 1)) {
            props.engineCallbacks.requestResponse(this.openHatchResponse);
            return 'You climb ladder to top. There is a hatch that goes above ground. Open it?';
        }

        return props.engineCallbacks.killPlayer('Clumsy Zombie, you climb the ladder but fall down, impaled to death on a rusty spoon.');
    }

    search = () => {
        if (this.inventory.checkItem(ItemId.CATACOMBS_MAP, 1)) {
            return 'There is a small scrap of paper is on the ground, is that a map?';
        }
    
        if (this.inventory.checkItem(ItemId.RUSTY_SPOON, 1)) {
            return 'By the ladder you see something reflecting the torchlight. But what is it?';
        }
    
        return 'There is nothing left to be found here it seems.';
    }

    takeMap = (props: CommandProps) => {
        if (this.inventory.checkItem(ItemId.CATACOMBS_MAP, 1)) {
            this.inventory.removeItem(ItemId.CATACOMBS_MAP, 1);
            props.engineCallbacks.addPlayerItem(ItemId.CATACOMBS_MAP, 1);
            return 'You found a Basic Map. In rooms where you can see, you can search for items. Increase your skills to widen your search range and to acquire more rare items. Try examining the map with examine map';
        }
    
        return 'There does not appear to be any map here.';
    }

    takeSpoon = (props: CommandProps) => {
        if (this.inventory.checkItem(ItemId.RUSTY_SPOON, 1)) {
            this.inventory.removeItem(ItemId.RUSTY_SPOON, 1);
            props.engineCallbacks.addPlayerItem(ItemId.RUSTY_SPOON, 1);
            return 'You have taken the rusty spoon.';
        }
    
        return 'There does not appear to be any spoon here.';
    }
}

export default Catacombs03;