import { RoomId, Command, EngineCallbacks, CommandProps, ResponseHandler, GameState, ReturnCodes } from './types';

import Item, { ItemId } from './objects/item';
import Player           from './objects/player';
import Body             from './items/body';

import * as utils   from './utils';
import * as strings from './strings';
import * as config  from './config';

let currentPlayer   : Player;
let responseHandler : ResponseHandler;
let currentState    : GameState;

export const getPlayer = () => { return currentPlayer; }
export const getState = () => { return currentState; }

const requestResponse = (handler: ResponseHandler) => { responseHandler = handler; }

export const init = () => {
    currentPlayer = new Player();
    currentState = GameState.NORMAL;
}

export const login = (wallet: string) => {
    currentPlayer.load(wallet);
    config.rooms.filter(a => a.resetRoom).forEach(a => a.resetRoom(engineCallbacks));
}

export const initialEntry = () => {
    const room = utils.roomById(currentPlayer.currentRoom);
    return `${room.entryText}${config.LINE_BREAK_CHAR}${room.exits()}`;
}

const roomChange = (id: RoomId, exitText: string) => {
    const room = utils.roomById(id);
    currentPlayer.currentRoom = room.id;
    return `${exitText}${config.LINE_BREAK_CHAR}${room.entryText}${config.LINE_BREAK_CHAR}${room.bodies()}${config.LINE_BREAK_CHAR}${room.exits()}`
}

const search = () => {
    const room = utils.roomById(currentPlayer.currentRoom);
    if (room.inventory.storage.length === 0) return strings.NO_ITEMS;
    const itemlist = room.inventory.storage.filter(a => a.item.id !== ItemId.PLAYER_BODY && a.item.id !== ItemId.ENEMY_BODY);
    let response = strings.SEARCH_HEADER;
    response += itemlist.map(a => `${config.LINE_BREAK_CHAR}- ${a.item.name} [${a.item.shortname}]`).join('');
    return response;
}

const inventory = () => {
    const playerItems = currentPlayer.inventory.storage.map(a => `${a.item.name} :: ${a.quantity}${config.LINE_BREAK_CHAR}`).join('');
    return `${strings.INVENTORY_HEADER}${playerItems}`;
}

const addPlayerItem = (item: Item, quantity: number) => currentPlayer.inventory.addItem(item, quantity);
const removePlayerItem = (id: ItemId, quantity: number) => currentPlayer.inventory.removeId(id, quantity);

const checkPlayerInventory = (id: ItemId, quantity: number) => {
    return currentPlayer.inventory.checkItem(id, quantity);
}

const dropPlayerItem = (props: CommandProps) => {
    if (currentPlayer.inventory.storage.length === 0) return strings.ITEM_NOT_FOUND;
    const item = utils.itemByName(props.input);

    if (item) {
        if (checkPlayerInventory(item.id, 1)) {
            currentPlayer.inventory.removeId(item.id, 1);
            const room = utils.roomById(currentPlayer.currentRoom);
            room.inventory.addItem(item, 1);
            return `${strings.DROPPED_ITEM} ${item.name}.`;
        }
    }

    return strings.ITEM_NOT_FOUND;
}

const take = (props: CommandProps) => {
    const room = utils.roomById(currentPlayer.currentRoom);
    const roomitems = room.inventory.storage.filter(a => a.quantity > 0);
    if (roomitems.length === 0) return strings.NO_ITEMS;

    const item = roomitems.find(a => props.input.includes(a.item.name) || props.input.includes(a.item.shortname));
    if (!item) return strings.ITEM_NOT_HERE;
    if (!item.item.canPickup) return strings.CANNOT_PICKUP;

    room.inventory.removeId(item.item.id, 1);
    currentPlayer.inventory.addItem(item.item, 1);

    return `${strings.TOOK_ITEM} ${item.item.name}`;
}

const examine = (props: CommandProps) => {
    const item = utils.itemByName(props.input);
    if (item) {
        if (checkPlayerInventory(item.id, 1)) {
            if (item.examineText) return item.examineText;
            return strings.ITEM_NOT_SPECIAL;
        }
    }

    return strings.ITEM_NOT_FOUND;
}

const killPlayer = (deathMessage: string) => {
    currentPlayer.createBody();
    currentPlayer.currentRoom = currentPlayer.spawnPoint;
    const room = utils.roomById(currentPlayer.currentRoom);
    return `${deathMessage}${config.LINE_BREAK_CHAR}${room.entryText}`;
}

const help = () => {
    const room = utils.roomById(currentPlayer.currentRoom);
    const combined = room.commands.concat(generalCommands);
    const helptext = combined.filter(a => a.helpText).map(a => `${a.command.join(' ')} :: ${a.helpText}${config.LINE_BREAK_CHAR}`).join('');
    return helptext;
}

const north = (props: CommandProps) => {
    const room = utils.roomById(currentPlayer.currentRoom);
    if (room.north) return room.north(props);
    return strings.CANT_GO;
}

const south = (props: CommandProps) => {
    const room = utils.roomById(currentPlayer.currentRoom);
    if (room.south) return room.south(props);
    return strings.CANT_GO;
}

const east = (props: CommandProps) => {
    const room = utils.roomById(currentPlayer.currentRoom);
    if (room.east) return room.east(props);
    return strings.CANT_GO;
}

const west = (props: CommandProps) => {
    const room = utils.roomById(currentPlayer.currentRoom);
    if (room.west) return room.west(props);
    return strings.CANT_GO;
}

const loot = () => {
    const room = utils.roomById(currentPlayer.currentRoom);
    
    const playerbody = room.inventory.storage.find(a => a.item.id === ItemId.PLAYER_BODY);
    if (playerbody) {
        const body = playerbody.item as Body;
        const bodyitems = body.inventory.storage;
        bodyitems.forEach(a => currentPlayer.inventory.addItem(a.item, a.quantity));
        room.inventory.removeItem(playerbody.item, 1);
        return strings.LOOTED_PLAYER_BODY;
    }

    return strings.NO_BODY_FOUND;
}

const use = (props: CommandProps) => {
    const item = utils.itemByName(props.input);
    if (!item) return strings.UNKNOWN_ITEM;
    if (!checkPlayerInventory(item.id, 1)) return strings.DONT_HAVE_ITEM;
    const room = utils.roomById(currentPlayer.currentRoom);
    const handler = room.itemhandlers.find(a => a.id === item.id);
    if (!handler) return strings.CANT_USE_HERE;
    return handler.handler(props);
}

const generalCommands: Command[] = [
    { command: [ 'help' ], handler: help },
    { command: [ 'north'], handler: north, helpText: 'Moves to the north', shortcut: 'n' },
    { command: [ 'south' ], handler: south, helpText: 'Moves to the south', shortcut: 's' },
    { command: [ 'east' ], handler: east, helpText: 'Moves to the east', shortcut: 'e' },
    { command: [ 'west' ], handler: west, helpText: 'Moves to the west', shortcut: 'w' },
    { command: [ 'inventory' ], handler: inventory, helpText: 'Shows you the items in your inventory', shortcut: 'i' },
    { command: [ 'drop' ], handler: dropPlayerItem, helpText: 'Allows you to drop an item' },
    { command: [ 'take' ], handler: take, helpText: 'Allows you to take an item' },
    { command: [ 'search'], handler: search, helpText: 'Searches the area for stuff' },
    { command: [ 'examine' ], handler: examine, helpText: 'Lets you examine an item' },    
    { command: [ 'loot' ], handler: loot, helpText: 'Loots a body', shortcut: 'l' },
    { command: [ 'use' ], handler: use, helpText: 'Allows you to use an item' }
]

const engineCallbacks: EngineCallbacks = {
    roomChange, addPlayerItem, removePlayerItem, checkPlayerInventory, requestResponse, killPlayer
}

const commandProps: CommandProps = { engineCallbacks, input: '' }

const combatLoop = () => {
    return 'NOT IMPLEMENTED';
}

const normalLoop = () => {
    const room = utils.roomById(currentPlayer.currentRoom);    
        
    if (responseHandler) {
        const response = responseHandler.handler(commandProps);
        responseHandler = null;
        return response;
    }

    const combined = room.commands.concat(generalCommands);
    const response = utils.findCommandMatch(commandProps.input, combined);

    switch (response.returncode) {
        case ReturnCodes.OK: return response.matched.handler(commandProps);
        case ReturnCodes.AMBIGUOUS_MATCH: return strings.AMBIGUOUS_COMMAND;
        default: return strings.UNKNOWN_COMMAND;
    }
}

export const handleCommand = (input: string) => {
    commandProps.input = input.trim().toLowerCase();

    switch (currentState) {
        case GameState.COMBAT: return combatLoop();
        default: return normalLoop();
    }
}