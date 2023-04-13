export class Discount {
    id: number;
    name: string;
    discount: number;
    constructor(id: number, name: string = '', discount: number) {
        this.id = id;
        this.name = name;
        this.discount = discount;
    }

    static applyDiscount(price: number, discount: number): number {
        const multiplier = (100 - discount) / 100;
        return price * multiplier;
    }
}

export class SeasonalDiscount extends Discount {
    start: Date;
    finish: Date;

    constructor(id: number, name: string, discount: number, start: Date = new Date(), finish: Date= new Date()) {
        super(id, name, discount);
        this.start = start;
        this.finish = finish;
    }
    //Активна ли сейчас распродажа
    isActive(): boolean {
        //Вычисление нового временного интервала (т.к. дата сезонной распродажи может быть указана для другого года,
        // а месяц и число завершения могут быть меньше, чем месяц и число начала - например, новогодняя распродажа)
        let todayDate: Date = new Date();
        let saleLength: number = this.finish.valueOf() - this.start.valueOf();
        let saleStart = new Date();
        saleStart.setUTCMonth(this.start.getUTCMonth());
        saleStart.setUTCDate(this.start.getUTCDate());
        saleStart.setUTCHours(this.start.getUTCHours());
        saleStart.setUTCMinutes(this.start.getUTCMinutes());
        let saleEnd = new Date( saleStart.valueOf() + saleLength);

        return (todayDate > saleStart && todayDate < saleEnd);
    }
}

export class VolumeDiscount extends Discount{
    minimumVolume: number;

    constructor(id: number, minimumVolume: number, discount: number) {
        super(id, '', discount);
        this.minimumVolume = minimumVolume;
    }

}