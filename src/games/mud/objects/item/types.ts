export enum ItemType {
    BASIC,
    WEAPON
}

export enum ItemId {
    NONE,
    
    TORCH,
    RUSTY_SPOON,
    CATACOMBS_MAP,

    PLAYER_BODY,
    ENEMY_BODY
}

export interface ItemHandler {
    id: ItemId,
    handler: any
}