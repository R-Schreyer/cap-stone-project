import {Product} from "./Product.ts";

export type Order = {
    id: string;
    productList: Product[];
    price: number;
    orderDate: Date;
    customerId: string;
}
