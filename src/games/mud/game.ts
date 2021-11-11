import { defaultPlayer, RoomId, Command, EngineCallbacks, CommandProps, ItemId } from './types';
import rooms from './rooms';
import items from './items';
import hotkeys from './hotkeys';

export const currentPlayer = defaultPlayer;

const roomById = (id: RoomId) => {
    return rooms.find(a => a.id === id);
}

export const login = (wallet: string) => {
    // TODO: Load player data for now just return the default player but slot in the wallet address
    currentPlayer.wallet = wallet;
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
    const playerItems = currentPlayer.inventory.map(a => `${a.item.name} :: ${a.quantity}\n`);
    return `You have the following items:\n${playerItems}`;
}

const search = () => {
    const room = roomById(currentPlayer.currentRoom);
    if (!room.isDark) {
        return room.entryText;
    }

    return 'It is too dark to search in here';
}

const addItem = (id: ItemId, quantity: number) => {
    const item = currentPlayer.inventory.find(a => a.item.id === id);

    if (item) {
        item.quantity += quantity;
    } else {
        const newitem = items.find(a => a.id === id);
        const inventoryitem = { item: newitem, quantity };
        currentPlayer.inventory.push(inventoryitem);
    }
}

const removeItem = (id: ItemId, quantity: number) => {
    if (currentPlayer.inventory.length === 0) return;
    const item = currentPlayer.inventory.find(a => a.item.id === id);

    if (item) {
        if (item.quantity > quantity) {
            item.quantity -= quantity;
        } else {            
            const index = currentPlayer.inventory.indexOf(item);
            delete currentPlayer.inventory[index];
        }
    }    
}

const checkInventory = (id: ItemId, quantity: number) => {
    if (currentPlayer.inventory.length === 0) return false;
    const item = currentPlayer.inventory.find(a => a.item.id === id);

    if (!item) return false;
    return item.quantity >= quantity;
}

const dropItem = (props: CommandProps) => {
    if (currentPlayer.inventory.length === 0) return 'That was not found in your inventory';
    const item = items.find(a => props.input.includes(a.shortname));

    if (item) {
        removeItem(item.id, 1);
        return `You have dropped ${item.name}`;
    }

    return 'That was not found in your inventory';
}

const generalCommands: Command[] = [
    { command: 'inventory', handler: inventory },
    { command: 'drop', handler: dropItem },
    { command: 'search', handler: search }
]

const engineCallbacks: EngineCallbacks = {
    roomChange,
    addItem,
    removeItem,
    checkInventory
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