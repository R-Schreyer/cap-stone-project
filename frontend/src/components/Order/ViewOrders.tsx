import {useNavigate, useParams} from 'react-router-dom';
import {Customer} from "../../types/Customer.ts";

type ViewOrdersProps = {
    customers: Customer[];
}

export default function ViewOrders({customers}: ViewOrdersProps) {
    const {id} = useParams<{ id: string }>();
    const customer = customers.find(customer => customer.id === id);
    const navigate = useNavigate();

    if (!customer) {
        return <div>Kunde nicht gefunden</div>;
    }

    return (
        <div>
            <h1>Bestellungen für {customer.firstname} {customer.lastname}</h1>
            <button onClick={() => navigate("/NewOrderPage/" + customer.id)}>Neue Bestellung</button>
            {/*<table>
                {customer.customerOrderList.map((order) => (
                    <tr key={customer.id}>
                        <td>{order.id}</td>
                        <td>{order.price}</td>
                    </tr>
                ))}
            </table>*/}

            {/*{customer.customerOrderList.length === 0 ? (
                <p>Keine Bestellungen vorhanden</p>
            ) : (
                <ul>
                    {customer.customerOrderList.map(order => (
                        <li key={order.id}>
                            <p>Bestellnummer: {order.id}</p>
                            <p>Produkte:</p>
                        </li>
                    ))}
                </ul>
            )}*/}
        </div>
    );
}