import {Order} from "../../types/Order";

type CustomerOrdersProps = {
    orders: Order[];
}

export default function CustomerOrders(props: CustomerOrdersProps) {
    return (
        <div>
            <h2>Bestellungen</h2>
            <ul>
                {props.orders.map((order, index) => (
                    <li key={index}>
                        <p>Bestellnummer: {order.id}</p>
                        <p>Datum: {order.orderDate.toLocaleDateString()}</p>
                        <ul>
                            {order.productList.map((product, index) => (
                                <li key={index}>{product.productName}</li>
                            ))}
                        </ul>
                        <p>Gesamtpreis: {order.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}


/*import React from "react";
import { Customer } from "../../types/Customer";
import { Order } from "../../types/Order";

type CustomerOrdersProps = {
    customer: Customer;
}

export default function CustomerOrders(props: CustomerOrdersProps) {
    return (
        <div>
            <h2>Bestellungen für {props.customer.firstname} {props.customer.lastname}</h2>
            <ul>
                {/!* Hier werden die Bestellungen des Kunden angezeigt *!/}
                {props.customer.customerOrderList.map((order: Order, index: number) => (
                    <li key={index}>
                        {/!* Anzeige der Bestellungsdetails *!/}
                        <p>Datum: {order.orderDate}</p>
                        <p>Preis: {order.price}</p>
                        <p>Produkte:</p>
                        <ul>
                            {order.productList.map((product, index) => (
                                <li key={index}>{product.productName}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}*/


/*import React from "react";
import { Customer } from "../../types/Customer";
import { Order } from "../../types/Order";

type CustomerOrdersProps = {
    customer: Customer;
}

export default function CustomerOrders(props: CustomerOrdersProps) {
    return (
        <div>
            <h2>Bestellungen für {props.customer.firstname} {props.customer.lastname}</h2>
            <ul>
                {/!* Hier werden die Bestellungen des Kunden angezeigt *!/}
                {props.customer.customerOrderList.map((order: Order, index: number) => (
                    <li key={index}>
                        {/!* Anzeige der Bestellungsdetails *!/}
                        <p>Datum: {order.orderDate}</p>
                        <p>Preis: {order.price}</p>
                        <p>Produkte:</p>
                        <ul>
                            {order.productList.map((product, index) => (
                                <li key={index}>{product.name}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}*/
