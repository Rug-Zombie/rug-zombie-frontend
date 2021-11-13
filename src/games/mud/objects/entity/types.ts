import { ItemId } from '../item/types';

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
    weapon: ItemId
}