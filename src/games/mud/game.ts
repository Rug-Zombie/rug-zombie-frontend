import { RoomId, Command, EngineCallbacks, CommandProps, ItemId, ResponseHandler, GameState } from './types';
import { roomById, itemById } from './utils';
import { ITEM_NOT_FOUND, NO_MAPS, ITEM_NOT_SPECIAL, CANT_GO, NOTHING_TO_SEE } from './strings';
import Player from './objects/player';
import rooms from './rooms';
import items from './items';

let currentPlayer: Player;
let responseHandler: ResponseHandler;
let currentState: GameState;

export const getPlayer = () => { return currentPlayer; }
const requestResponse = (handler: ResponseHandler) => {
    responseHandler = handler;
}

export const init = () => {
    currentPlayer = new Player();
    currentState = GameState.NORMAL;
}

export const login = (wallet: string) => {
    currentPlayer.load(wallet);
    rooms.filter(a => a.resetRoom).forEach(a => a.resetRoom(engineCallbacks));
}

export const initialEntry = () => {
    const room = roomById(currentPlayer.currentRoom);
    return `${room.entryText}<br/>${room.exits()}`;
}

const roomChange = (newid: RoomId, exitText: string) => {
    const room = roomById(newid);
    if (!room) return `[ERROR] Room change failed to: ${newid}`;

    currentPlayer.currentRoom = room.id;
    return `${exitText}<br />${room.entryText}<br />${room.exits()}`
}

const search = (props: CommandProps) => {
    const room = roomById(currentPlayer.currentRoom);
    if (room.search) return room.search(props);
    return NOTHING_TO_SEE;
}

const inventory = () => {
    const playerItems = currentPlayer.inventory.storage.filter(a => a.quantity > 0).map(a => `${itemById(a.id).name} :: ${a.quantity}<br />`);
    return `You have the following items:<br />${playerItems}`;
}

const addPlayerItem = (id: ItemId, quantity: number) => currentPlayer.inventory.addItem(id, quantity);
const removePlayerItem = (id: ItemId, quantity: number) => currentPlayer.inventory.removeItem(id, quantity);

const checkPlayerInventory = (id: ItemId, quantity: number) => {
    return currentPlayer.inventory.checkItem(id, quantity);
}

const dropPlayerItem = (props: CommandProps) => {
    if (currentPlayer.inventory.storage.length === 0) return ITEM_NOT_FOUND;
    const item = items.find(a => props.input.includes(a.shortname));

    if (item) {
        if (checkPlayerInventory(item.id, 1)) {
            currentPlayer.inventory.removeItem(item.id, 1);
            return `You have dropped ${item.name}.`;
        }
    }

    return ITEM_NOT_FOUND;
}

const examineMap = () => {
    if (checkPlayerInventory(ItemId.CATACOMBS_MAP, 1)) {
        return items.find(a => a.id === ItemId.CATACOMBS_MAP).examineText;
    }

    return NO_MAPS;
}

const examine = (props: CommandProps) => {
    if (props.input.includes('map')) return examineMap();

    const item = items.find(a => props.input.includes(a.shortname));
    if (item) {
        if (checkPlayerInventory(item.id, 1)) {
            if (item.examineText) return item.examineText;
            return ITEM_NOT_SPECIAL;
        }
    }

    return ITEM_NOT_FOUND;
}

const killPlayer = (deathMessage: string) => {
    const { wallet } = currentPlayer;
    init();
    login(wallet);
    const room = roomById(currentPlayer.currentRoom);
    return `${deathMessage}<br />${room.entryText}`;
}

const help = () => {
    const room = roomById(currentPlayer.currentRoom);
    const generalHelp = generalCommands.filter(a => a.helpText).map(a => `${a.command} :: ${a.helpText}<br />`)
    const roomHelp = room.commands.filter(a => a.helpText).map(a => `${a.command} :: ${a.helpText}<br />`);
    return `${generalHelp}<br />${roomHelp}`;
}

const north = (props: CommandProps) => {
    const room = roomById(currentPlayer.currentRoom);
    if (room.north) return room.north(props);
    return CANT_GO;
}

const south = (props: CommandProps) => {
    const room = roomById(currentPlayer.currentRoom);
    if (room.south) return room.south(props);
    return CANT_GO;
}

const east = (props: CommandProps) => {
    const room = roomById(currentPlayer.currentRoom);
    if (room.east) return room.east(props);
    return CANT_GO;
}

const west = (props: CommandProps) => {
    const room = roomById(currentPlayer.currentRoom);
    if (room.west) return room.west(props);
    return CANT_GO;
}

const generalCommands: Command[] = [
    { command: 'inventory', handler: inventory, helpText: 'Shows you the items in your inventory', shortcut: 'i' },
    { command: 'drop', handler: dropPlayerItem, helpText: 'Allows you to drop an item' },
    { command: 'search', handler: search, helpText: 'Searches the area for stuff' },
    { command: 'examine', handler: examine, helpText: 'Lets you examine an item' },
    { command: 'help', handler: help },
    { command: 'north', handler: north, helpText: 'Moves to the north', shortcut: 'n' },
    { command: 'south', handler: south, helpText: 'Moves to the south', shortcut: 's' },
    { command: 'east', handler: east, helpText: 'Moves to the east', shortcut: 'e' },
    { command: 'west', handler: west, helpText: 'Moves to the west', shortcut: 'w' }
]

const engineCallbacks: EngineCallbacks = {
    roomChange, addPlayerItem, removePlayerItem, checkPlayerInventory, requestResponse, killPlayer
}

const commandProps: CommandProps = { engineCallbacks, input: '' }

const combatLoop = () => {
    return 'NOT IMPLEMENTED';
}

const normalLoop = () => {
    const room = roomById(currentPlayer.currentRoom);    
        
    if (responseHandler) {
        const response = responseHandler.handler(commandProps);
        responseHandler = null;
        return response;
    }

    const roomCommand = room.commands.find(a => commandProps.input.includes(a.command));
    if (roomCommand) return roomCommand.handler(commandProps);

    const roomCommandShort = room.commands.filter(a => a.shortcut).find(a => a.shortcut === commandProps.input);
    if (roomCommandShort) return roomCommandShort.handler(commandProps);

    const generalCommand = generalCommands.find(a => commandProps.input.includes(a.command));
    if (generalCommand) return generalCommand.handler(commandProps);

    const generalCommandShort = generalCommands.filter(a => a.shortcut).find(a => a.shortcut === commandProps.input);
    if (generalCommandShort) return generalCommandShort.handler(commandProps);

    return 'Unknown Command!';
}

export const handleCommand = (input: string) => {
    const room = roomById(currentPlayer.currentRoom);
    if (!room) return `[ERROR] Room Not Found - ID: ${currentPlayer.currentRoom}`;

    commandProps.input = input.trim().toLowerCase();

    switch (currentState) {
        case GameState.COMBAT: return combatLoop();
        default: return normalLoop();
    }
}