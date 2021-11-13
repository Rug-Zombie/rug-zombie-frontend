import { Command, EngineCallbacks, CommandProps, ResponseHandler, GameState, ReturnCodes } from 'games/mud/types';
import { ItemId } from 'games/mud/objects/item/types';
import { RoomId } from 'games/mud/objects/room/types';

import * as utils       from 'games/mud/utils';
import * as strings     from 'games/mud/strings';
import * as config      from 'games/mud/config';

import Item             from 'games/mud/objects/item';
import Player           from 'games/mud/entities/player';
import Body             from 'games/mud/items/body';
import Moan             from 'games/mud/effects/moan';

let currentPlayer   : Player;
let currentState    : GameState;
let responseHandler : ResponseHandler;

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
    const room = utils.roomById(currentPlayer.currentroom);
    return `${room.entryText}${strings.LINE_BREAK_CHAR}${room.exits()}`;
}

const roomChange = (id: RoomId, exitText: string) => {
    const room = utils.roomById(id);
    currentPlayer.currentroom = room.id;
    return `${exitText}${strings.LINE_BREAK_CHAR}${room.entryText}${strings.LINE_BREAK_CHAR}${room.bodies()}${strings.LINE_BREAK_CHAR}${room.exits()}`
}

const search = () => {
    const room = utils.roomById(currentPlayer.currentroom);
    if (room.inventory.storage.length === 0) return strings.NO_ITEMS;
    const itemlist = room.inventory.storage.filter(a => a.item.id !== ItemId.PLAYER_BODY && a.item.id !== ItemId.ENEMY_BODY);
    let response = strings.SEARCH_HEADER;
    response += itemlist.map(a => `${strings.LINE_BREAK_CHAR}- ${a.item.name} [${a.item.shortname}]`).join('');
    return response;
}

const inventory = () => {
    const playerItems = currentPlayer.inventory.storage.map(a => `${a.item.name} :: ${a.quantity}${strings.LINE_BREAK_CHAR}`).join('');
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
            if (currentPlayer.isEquipped(item.id)) return strings.CANT_DROP_EQUIPPED;
            currentPlayer.inventory.removeId(item.id, 1);
            const room = utils.roomById(currentPlayer.currentroom);
            room.inventory.addItem(item, 1);
            return `${strings.DROPPED_ITEM} ${item.name}.`;
        }
    }

    return strings.ITEM_NOT_FOUND;
}

const take = (props: CommandProps) => {
    const room = utils.roomById(currentPlayer.currentroom);
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
    currentPlayer.handleDeath();
    const room = utils.roomById(currentPlayer.currentroom);
    return `${deathMessage}${strings.LINE_BREAK_CHAR}${room.entryText}`;
}

const help = () => {
    const room = utils.roomById(currentPlayer.currentroom);
    const combined = room.commands.concat(generalCommands);
    const helptext = combined.filter(a => a.helpText).map(a => `${a.command.join(' ')} :: ${a.helpText}${strings.LINE_BREAK_CHAR}`).join('');
    return helptext;
}

const north = (props: CommandProps) => {
    const room = utils.roomById(currentPlayer.currentroom);
    if (room.north) return room.north(props);
    return strings.CANT_GO;
}

const south = (props: CommandProps) => {
    const room = utils.roomById(currentPlayer.currentroom);
    if (room.south) return room.south(props);
    return strings.CANT_GO;
}

const east = (props: CommandProps) => {
    const room = utils.roomById(currentPlayer.currentroom);
    if (room.east) return room.east(props);
    return strings.CANT_GO;
}

const west = (props: CommandProps) => {
    const room = utils.roomById(currentPlayer.currentroom);
    if (room.west) return room.west(props);
    return strings.CANT_GO;
}

const loot = () => {
    const room = utils.roomById(currentPlayer.currentroom);
    
    const playerbody = room.inventory.storage.find(a => a.item.id === ItemId.PLAYER_BODY);
    if (playerbody) {
        const body = playerbody.item as Body;
        const bodyitems = body.inventory.storage;
        bodyitems.forEach(a => currentPlayer.inventory.addItem(a.item, a.quantity));
        room.inventory.removeItem(playerbody.item, 1);
        currentPlayer.bodyLocation = RoomId.NONE;
        return strings.LOOTED_PLAYER_BODY;
    }

    return strings.NO_BODY_FOUND;
}

const use = (props: CommandProps) => {
    const item = utils.itemByName(props.input);
    if (!item) return strings.UNKNOWN_ITEM;
    if (!checkPlayerInventory(item.id, 1)) return strings.DONT_HAVE_ITEM;
    const room = utils.roomById(currentPlayer.currentroom);
    const handler = room.itemhandlers.find(a => a.id === item.id);
    if (!handler) return strings.CANT_USE_HERE;
    return handler.handler(props);
}

const summonBody = () => {
    if (currentPlayer.bodyLocation === RoomId.NONE) return strings.NO_BODY_TO_SUMMON;
    const room = utils.roomById(currentPlayer.currentroom);
    const check = room.roomconnections.filter(a => a === currentPlayer.bodyLocation);
    if (check.length === 0) return strings.TOO_FAR_FROM_BODY;
    const bodyroom = utils.roomById(currentPlayer.bodyLocation);
    const playerbody = bodyroom.inventory.storage.find(a => a.item.id === ItemId.PLAYER_BODY).item as Body;
    const bodyitems = playerbody.inventory.storage;
    bodyitems.forEach(a => room.inventory.addItem(a.item, a.quantity));
    bodyroom.inventory.removeItem(playerbody, 1);
    return strings.WEAK_BODY_SUMMON;
}

const open = () => {
    return 'NOT IMPLEMENTED YET';
}

const say = () => {
    return 'NOT IMPLEMENTED YET';
}

const shout = () => {
    return 'NOT IMPLEMENTED YET';
}

const moan = () => {
    return currentPlayer.applyEffect(new Moan());
}

const equip = () => {
    const item = utils.itemByName(commandProps.input);
    if (!item) return strings.ITEM_NOT_FOUND;
    if (currentPlayer.inventory.storage.length === 0) return strings.ITEM_NOT_FOUND;
    const playeritem = currentPlayer.inventory.getItem(item.id);
    if (!playeritem) return strings.DONT_HAVE_ITEM;
    if (!playeritem.item.canEquip) return strings.CANT_EQUIP_THAT;
    return currentPlayer.equip(playeritem.item);
}

const unequip = () => {
    const item = utils.itemByName(commandProps.input);
    if (!item) return strings.ITEM_NOT_FOUND;
    if (currentPlayer.inventory.storage.length === 0) return strings.ITEM_NOT_FOUND;
    const playeritem = currentPlayer.inventory.getItem(item.id);
    if (!playeritem) return strings.DONT_HAVE_ITEM;
    if (!currentPlayer.isEquipped(playeritem.item.id)) return strings.NOT_EQUIPPED;
    return currentPlayer.unequip(playeritem.item);
}

const stats = () => {
    return currentPlayer.statsOutput();
}

const generalCommands: Command[] = [
    { command: [ 'help' ], handler: help, notTickable: true },
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
    { command: [ 'use' ], handler: use, helpText: 'Allows you to use an item' },
    { command: [ 'open' ], handler: open, helpText: 'Allows you to open a container' },
    { command: [ 'moan' ], handler: moan, helpText: 'Moan a bit, maybe does something?' },
    { command: [ 'equip' ], handler: equip, helpText: 'Allows you to equip something' },
    { command: [ 'unequip' ], handler: unequip, helpText: 'Allows you to unequip something' },
    { command: [ 'stats' ], handler: stats, helpText: 'Shows you various statistics' },
    { command: [ 'say' ], handler: say },
    { command: [ 'shout' ], handler: shout },
    { command: [ 'summon', 'body' ], handler: summonBody, helpText: 'Allows you to summon your dead corpse' }
]

const attack = () => {
    return 'NOT IMPLEMENTED YET';
}

const combatCommands: Command[] = [
    { command: [ 'attack' ], handler: attack, helpText: 'Attack an enemy', shortcut: 'a' },
]

const engineCallbacks: EngineCallbacks = {
    roomChange, addPlayerItem, removePlayerItem, checkPlayerInventory, requestResponse, killPlayer
}

const commandProps: CommandProps = { 
    engineCallbacks, playerEntityCallbacks: null, input: '', output: '', notTickable: false 
}

const combatLoop = () => {
    return 'NOT IMPLEMENTED';
}

const normalLoop = () => {
    const room = utils.roomById(currentPlayer.currentroom);    
        
    if (responseHandler) {
        const response = responseHandler.handler(commandProps);
        responseHandler = null;
        return response;
    }

    const combined = room.commands.concat(generalCommands);
    const response = utils.findCommandMatch(commandProps.input, combined);

    switch (response.returncode) {
        case ReturnCodes.OK: 
            commandProps.notTickable = response.matched.notTickable;
            return response.matched.handler(commandProps);
        case ReturnCodes.AMBIGUOUS_MATCH: 
            commandProps.notTickable = true;
            return strings.AMBIGUOUS_COMMAND;
        default: 
            commandProps.notTickable = true;
            return strings.UNKNOWN_COMMAND;
    }
}

export const handleCommand = (input: string) => {
    commandProps.input = input.trim().toLowerCase();
    commandProps.notTickable = false;
    commandProps.playerEntityCallbacks = currentPlayer.callbacks;

    switch (currentState) {
        case GameState.COMBAT: 
            commandProps.output = combatLoop();
            break;
        default: 
            commandProps.output = normalLoop();
            break;
    }

    if (!commandProps.notTickable) commandProps.output = `${commandProps.output}${strings.LINE_BREAK_CHAR}${currentPlayer.processTick()}`;
    return commandProps.output;
}