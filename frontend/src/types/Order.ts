import {Product} from "./Product.ts";

export type Order = {
    id: string;
    productList: Product[]; // Liste der Produkte in der Bestellung
    price: number; // Preis der Bestellung
    orderDate: Date; // Datum der Bestellung
}
