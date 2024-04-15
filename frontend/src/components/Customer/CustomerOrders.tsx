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