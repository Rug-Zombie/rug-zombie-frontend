import { RoomId, ItemId } from './types';
import rooms from './rooms';
import items from './items';

export const roomById = (id: RoomId) => { return rooms.find(a => a.id === id); }
export const itemById = (id: ItemId) => { return items.find(a => a.id === id); }