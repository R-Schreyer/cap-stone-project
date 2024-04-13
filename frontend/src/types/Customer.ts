import {Order} from "./Order.ts";

export type Customer = {
    id: string;
    firstname: string;
    lastname: string;
    address: string;
    email: string;
    customerOrderList: Order[];
}