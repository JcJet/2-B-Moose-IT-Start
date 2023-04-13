import {SeasonalDiscount, VolumeDiscount} from "./Discount";
import {StoreItem} from "./StoreItem";
import * as json_file from "./data/task3testData.json";
import {Cart, CartEntry} from "./Cart";

// Получение товара по ID
export function findStoreItemById(id: number): StoreItem {
    const item = storeItems.find(item => item.id == id);
    if (!item){
        throw("товар с данным ID не найден")
    }
    return item;
}

// Получение сезонной скидки по ID
export function findSeasonalDiscountById(id: number): SeasonalDiscount {
    const item = seasonalDiscounts.find(item => item.id == id);
    if (!item){
        throw("скидка с данным ID не найдена")
    }
    return item;
}

// Получение лучшей скидки на общую сумму
export function getVolumeDiscount(total: number): VolumeDiscount {
    const applicableDiscounts = volumeDiscounts.filter(discount => discount.minimumVolume < total);
    const biggestDiscount = applicableDiscounts.reduce(
        (prev, current) => {
            return prev.discount > current.discount ? prev : current
        }
    );
    return biggestDiscount;
}

// Массивы для хранения данных, загруженных из JSON
let storeItems: StoreItem[] = [];
let volumeDiscounts: VolumeDiscount[] = [];
let seasonalDiscounts: SeasonalDiscount[] = [];

// Загрузка данных из JSON в соответсвующие объекты. Возвращает объект корзины с добавленными товарами
export function loadData(): Cart {

    for (let item of json_file.items) {
        let storeItem = new StoreItem(item['id'], item['name'], item['price'], parseInt(item['discount']));
        storeItems.push(storeItem);
    }
    for (let item of json_file.discounts) {
        let seasonalDiscount = new SeasonalDiscount(item.id, item.name, parseInt(item.discount))
        seasonalDiscounts.push(seasonalDiscount)
    }

    for (let item of json_file.totalDiscounts) {
        let totalDiscount = new VolumeDiscount(item.id, item.minPrice, parseInt(item.discount));
        volumeDiscounts.push(totalDiscount);
    }

    for (let item of json_file.itemsDiscounts) {
        let storeItem = findStoreItemById(item.itemId);
        let discount = findSeasonalDiscountById(item.discountId)
        storeItem.addDiscount([discount]);
    }

    let cart = new Cart();
    for (let item of json_file.purchases) {
        cart.addItems([new CartEntry(item.item, item.amount)])
    }

    return cart;
}