import {Discount} from "./Discount";
import {findStoreItemById, getVolumeDiscount} from "./Storage";

export class CartEntry {
    item_id: number;
    item_count: number;

    constructor(item_id: number, item_count: number) {
        this.item_id = item_id;
        this.item_count = item_count
    }
}

export class Cart {
    items: CartEntry[];
    constructor() {
        this.items = []
    }

    addItems(items: CartEntry[]): void {
        this.items.push(...items);
    }

    //Вывод содержимиого корзины, с учетом скидок, в консоль
    printTotal(): void {
        let total: number = 0;
        let total_discounted: number = 0;
        for (let item_entry of this.items) {
            const item = findStoreItemById(item_entry.item_id);

            let item_price = item.price;
            let items_price = item.price * item_entry.item_count;
            total += items_price;

            let item_price_discounted = item.getDiscountedPrice();
            let items_price_discounted= item_price_discounted * item_entry.item_count;
            total_discounted += items_price_discounted;

            console.log(`${item.name}: ${item_entry.item_count}, ${items_price_discounted} рублей (${items_price} без скидки)`)
        }
        console.log(`Итого: ${total_discounted} (${total} рублей без скидки)`);
        const volumeDiscount = getVolumeDiscount(total_discounted);
        console.log(`Итого со скидкой: ${Discount.applyDiscount(total_discounted, volumeDiscount.discount)}`)

    }
}