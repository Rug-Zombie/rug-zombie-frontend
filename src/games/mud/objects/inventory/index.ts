import { InventoryItem } from '../../types';
import { ItemId } from '../item/types';
import Item from '../item';

class Inventory {
    storage: InventoryItem[] = [ ];

    addItem = (item: Item, quantity: number) => {
        const check = this.storage.find(a => a.item.id === item.id);

        if (check) {
            check.quantity += quantity;
        } else {
            const inventoryItem = { item, quantity };
            this.storage.push(inventoryItem);
        }
    }

    removeItem = (item: Item, quantity: number) => {
        if (!this.storage) return;
        if (this.storage.length === 0) return;
        const check = this.storage.find(a => a.item === item);

        if (check) {
            if (check.quantity > quantity) {
                check.quantity -= quantity;
            } else {
                this.storage = this.storage.filter(a => a.item !== item);
            }
        }
    }

    removeId = (id: ItemId, quantity: number) => {
        if (!this.storage) return;
        if (this.storage.length === 0) return;
        const check = this.storage.find(a => a.item.id === id);

        if (check) {
            if (check.quantity > quantity) {
                check.quantity -= quantity;
            } else {
                this.storage = this.storage.filter(a => a.item.id !== id);
            }
        }
    }

    checkItem = (id: ItemId, quantity: number) => {
        if (!this.storage) return false;
        if (this.storage.length === 0) return false;
        const item = this.storage.find(a => a.item.id === id);
    
        if (!item) return false;
        return item.quantity >= quantity;
    }
}

export default Inventory;