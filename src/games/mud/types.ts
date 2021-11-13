import { EntityCallbacks } from 'games/mud/objects/entity/types';
import Item from './objects/item';

export enum GameState {
    NORMAL,
    COMBAT
}

export enum ReturnCodes {
    OK,
    ERROR,

    NO_MATCH,
    AMBIGUOUS_MATCH
}

export interface CommandResponse {
    returncode: ReturnCodes,
    matched: Command
}

export interface InventoryItem {
    item: Item,
    quantity: number
}

export interface Command {
    command: string[],
    handler: any,
    helpText?: string,
    shortcut?: string,
    notTickable?: boolean
}

export interface EngineCallbacks {
    roomChange: any,
    addPlayerItem: any,
    removePlayerItem: any,
    checkPlayerInventory: any,
    requestResponse: any,
    killPlayer: any
}

export interface CommandProps {
    engineCallbacks: EngineCallbacks,
    playerEntityCallbacks: EntityCallbacks,
    input: string,
    output: string,
    notTickable: boolean
}

export interface Hotkey {
    input: string,
    output: string
}

export interface ResponseHandler {
    handler: any
}