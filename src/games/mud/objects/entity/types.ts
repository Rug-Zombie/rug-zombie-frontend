import Weapon from 'games/mud/objects/item/weapon';

export enum EntityId {
    PLAYER
}

export interface EntityStats {
    health: number,
    strength: number,
    luck: number,
    intelligence: number
}

export interface EntityEquipment {
    weapon: Weapon
}

export enum ModifyStatsType {
    STRENGTH
}

export interface EntityCallbacks {
    modifyStats: any
}