export enum ItemId {
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

class Item {
    id: ItemId;

    name: string;

    altName: string;

    description: string;

    shortname: string;

    examineText: string;

    canPickup = true;

    canBeLooted = false;
}

export default Item;