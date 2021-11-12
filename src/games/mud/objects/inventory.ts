import { InventoryItem, ItemId } from '../types';

class Inventory {
    storage: InventoryItem[] = [ ];

    addItem = (id: ItemId, quantity: number) => {
        const item = this.storage.find(a => a.id === id);

        if (item) {
            item.quantity += quantity;
        } else {
            const inventoryItem = { id, quantity };
            this.storage.push(inventoryItem);
        }
    }

    removeItem = (id: ItemId, quantity: number) => {
        if (!this.storage) return;
        if (this.storage.length === 0) return;
        const item = this.storage.find(a => a.id === id);

        if (item) {
            if (item.quantity > quantity) {
                item.quantity -= quantity;
            } else {            
                item.quantity = 0;
            }
        }  
    }

    checkItem = (id: ItemId, quantity: number) => {
        if (!this.storage) return false;
        if (this.storage.length === 0) return false;
        const item = this.storage.find(a => a.id === id);
    
        if (!item) return false;
        return item.quantity >= quantity;
    }
}

export default Inventory;