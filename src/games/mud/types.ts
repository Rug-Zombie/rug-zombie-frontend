export enum RoomId {
    CATACOMBS_01,
    CATACOMBS_02,
    CATACOMBS_03,
    ENTRANCE,
    TESTROOM1
}

export interface Command {
    command: string,
    handler: any
}

export interface RoomInfo {
    id: RoomId,
    isDark: boolean,
    entryText: string,
    commands: Command[]
}

export interface PlayerInfo {
    wallet: string,
    currentRoom: RoomId,
    counter: number,
    inventory: InventoryItem[]
}

export enum ItemId {
    TORCH,
    RUSTY_SPOON,
    NASTY_KNIFE
}

export interface ItemInfo {
    id: ItemId,
    name: string,
    description: string,
    shortname: string
}

export interface InventoryItem {
    item: ItemInfo,
    quantity: number
}

export const defaultPlayer: PlayerInfo = {
    wallet: '',
    currentRoom: RoomId.CATACOMBS_01,
    inventory: [ ],
    counter: 0
}

export interface EngineCallbacks {
    roomChange: any,
    addItem: any,
    removeItem: any,
    checkInventory: any
}

export interface CommandProps {
    engineCallbacks: EngineCallbacks,
    input: string
}

export interface Hotkey {
    input: string,
    output: string
}