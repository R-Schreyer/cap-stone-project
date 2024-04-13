import {Order} from "../../types/Order.ts";

interface ViewOrdersProps {
    customerOrderList: Order[];
}

export default function ViewOrders(props: ViewOrdersProps) {
    return (
        <div>
            <h2>Orders</h2>
            <ul>
                {props.customerOrderList.map(order => (
                    <li key={order.id}>
                        {/* Hier könntest du die Informationen für jede Bestellung anzeigen */}
                        {/* Zum Beispiel: */}
                        <div>ID: {order.id}</div>
                        <div>Price: {order.price}</div>
                        {/* Weitere Bestellinformationen hier einfügen */}
                    </li>
                ))}
            </ul>
        </div>
    );
}


/*import {Order} from "../../types/Order.ts";

interface ViewOrdersProps {
    customerOrderList: Order[];
}

function ViewOrders(props: ViewOrdersProps) {
    return (
        <div>
            <h2>Orders</h2>
            <ul>
                {props.customerOrderList.map(order => (
                    <li key={order.id}>
                        {/!* Hier könntest du die Informationen für jede Bestellung anzeigen *!/}
                        {/!* Zum Beispiel: *!/}
                        <div>ID: {order.id}</div>
                        <div>Price: {order.price}</div>
                        {/!* Weitere Bestellinformationen hier einfügen *!/}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ViewOrders;*/
