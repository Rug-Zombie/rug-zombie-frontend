import { RoomId, Command, EngineCallbacks, CommandProps, ItemId } from './types';
import Player from './objects/player';
import rooms from './rooms';
import items from './items';
import hotkeys from './hotkeys';

let currentPlayer: Player;

const roomById = (id: RoomId) => {
    return rooms.find(a => a.id === id);
}

const itemById = (id: ItemId) => {
    return items.find(a => a.id === id);
}

export const getPlayer = () => {
    return currentPlayer;
}

export const init = () => {
    currentPlayer = new Player();
}

export const login = (wallet: string) => {
    currentPlayer.load(wallet);
}

export const initialEntry = () => {
    const room = roomById(currentPlayer.currentRoom);
    return room.entryText;
}

const roomChange = (newid: RoomId, exitText: string) => {
    const room = roomById(newid);
    if (!room) return `[ERROR] Room change failed to: ${newid}`;

    currentPlayer.currentRoom = room.id;
    return `${exitText}${`\n`}${room.entryText}`
}

const inventory = () => {
    const playerItems = currentPlayer.inventory.storage.filter(a => a.quantity > 0).map(a => `${itemById(a.id).name} :: ${a.quantity} == `);
    return `You have the following items:\n${playerItems}`;
}

const search = () => {
    const room = roomById(currentPlayer.currentRoom);
    
    if (!room.isDark) {
        return room.entryText;
    }

    return 'It is too dark to search in here.';
}

const addPlayerItem = (id: ItemId, quantity: number) => {
    currentPlayer.inventory.addItem(id, quantity);
}

const removePlayerItem = (id: ItemId, quantity: number) => {
    currentPlayer.inventory.removeItem(id, quantity);
}

const checkPlayerInventory = (id: ItemId, quantity: number) => {
    return currentPlayer.inventory.checkItem(id, quantity);
}

const dropPlayerItem = (props: CommandProps) => {
    if (currentPlayer.inventory.storage.length === 0) return 'That was not found in your inventory1111.';
    const item = items.find(a => props.input.includes(a.shortname));

    if (item) {
        if (checkPlayerInventory(item.id, 1)) {
            currentPlayer.inventory.removeItem(item.id, 1);
            return `You have dropped ${item.name}.`;
        }
    }

    return 'That was not found in your inventory.';
}

const examineMap = () => {
    if (checkPlayerInventory(ItemId.CATACOMBS_MAP, 1)) {
        return 'Its a basic map. it only has 3 locations.';
    }

    return 'You do not have any maps.';
}

const examine = (props: CommandProps) => {
    if (props.input.includes('map')) return examineMap();

    const item = items.find(a => props.input.includes(a.shortname));
    if (item) {
        if (checkPlayerInventory(item.id, 1)) {
            if (item.examineText) return item.examineText;
            return 'There is nothing special about this item.';
        }
    }

    return 'That was not found in your inventory.';
}

const generalCommands: Command[] = [
    { command: 'inventory', handler: inventory },
    { command: 'drop', handler: dropPlayerItem },
    { command: 'search', handler: search },
    { command: 'examine', handler: examine }
]

const engineCallbacks: EngineCallbacks = {
    roomChange,
    addPlayerItem,
    removePlayerItem,
    checkPlayerInventory
}

const commandProps: CommandProps = {
    engineCallbacks,
    input: ''
}

export const handleCommand = (input: string) => {
    const room = roomById(currentPlayer.currentRoom);
    if (!room) return `[ERROR] Room Not Found - ID: ${currentPlayer.currentRoom}`;

    commandProps.input = input;
    const hotkey = hotkeys.find(a => a.input === input);
    
    if (hotkey) {
        commandProps.input = hotkey.output;
    }    

    const roomCommand = room.commands.find(a => commandProps.input.includes(a.command));
    if (roomCommand) return roomCommand.handler(commandProps);

    const generalCommand = generalCommands.find(a => commandProps.input.includes(a.command));
    if (generalCommand) return generalCommand.handler(commandProps);

    return 'Unknown Command!';
}