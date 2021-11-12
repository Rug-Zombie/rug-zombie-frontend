export enum ItemId {
    TORCH,
    RUSTY_SPOON,
    CATACOMBS_MAP
}

export enum RoomId {
    NONE,
    CATACOMBS_01,
    CATACOMBS_02,
    CATACOMBS_03,
    CATACOMBS_04
}

export enum GameState {
    NORMAL,
    COMBAT
}

export interface InventoryItem {
    id: ItemId,
    quantity: number
}

export interface Command {
    command: string,
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