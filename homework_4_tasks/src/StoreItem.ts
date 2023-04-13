import {Discount, SeasonalDiscount} from "./Discount";

export class StoreItem {
    id: number;
    name: string;
    price: number;
    discount: number;
    disounts: SeasonalDiscount[];

    constructor(id: number, name: string, price: number, discount: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.discount = discount;
        this.disounts = []
    }

    addDiscount(discounts: SeasonalDiscount[]) {
        this.disounts.push(...discounts);
    }

    clearDiscounts() {
        this.disounts = []
    }


    getDiscountedPrice() {
        let price: number = this.price;
        price = Discount.applyDiscount(price, this.discount); // скидка по умолчанию


        for (let discount of this.disounts) {
            if (discount.isActive()) {
                price = Discount.applyDiscount(price, discount.discount);
            }
        }
        return price;
    }
}