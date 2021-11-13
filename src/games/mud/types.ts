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
    shortcut?: string
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
    input: string
}

export interface Hotkey {
    input: string,
    output: string
}

export interface ResponseHandler {
    handler: any
}