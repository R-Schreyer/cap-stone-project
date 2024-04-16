import {Order} from "../../types/Order";

type CustomerOrdersProps = {
    orders: Order[];
}

export default function CustomerOrders(props: Readonly<CustomerOrdersProps>) {
    return (
        <div>
            <h2>Bestellungen</h2>
            <ul>
                {props.orders.map((order) => (
                    <li key={"customer-order"}>
                        <p>Bestellnummer: {order.id}</p>
                        <p>Datum: {order.orderDate.toLocaleDateString()}</p>
                        <ul>
                            {order.productList.map((product) => (
                                <li key={"productName"}>{product.productName}</li>
                            ))}
                        </ul>
                        <p>Gesamtpreis: {order.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}