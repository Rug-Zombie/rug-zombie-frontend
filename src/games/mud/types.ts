export enum ItemId {
    TORCH,
    RUSTY_SPOON,
    CATACOMBS_MAP,
    NASTY_KNIFE
}

export enum RoomId {
    NONE,
    CATACOMBS_01,
    CATACOMBS_02,
    CATACOMBS_03
}

export interface InventoryItem {
    id: ItemId,
    quantity: number
}

export interface Command {
    command: string,
    handler: any
}

export interface EngineCallbacks {
    roomChange: any,
    addPlayerItem: any,
    removePlayerItem: any,
    checkPlayerInventory: any
}

export interface CommandProps {
    engineCallbacks: EngineCallbacks,
    input: string
}

export interface Hotkey {
    input: string,
    output: string
}

export interface ItemInfo {
    id: ItemId,
    name: string,
    description: string,
    shortname: string,
    examineText?: string
}