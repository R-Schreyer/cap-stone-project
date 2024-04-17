import {useNavigate, useParams} from 'react-router-dom';
import {Customer} from "../../types/Customer.ts";
import axios from "axios";
import {Order} from "../../types/Order.ts";
import React from "react";


type ViewOrdersProps = {
    customers: Customer[];
    fetchCustomers: () => void
    handleOrder: (order: Order) => void
}

export default function ViewOrders({customers, fetchCustomers, handleOrder}: Readonly<ViewOrdersProps>) {
    const {id} = useParams<{ id: string }>();
    const customer = customers.find(customer => customer.id === id);
    const navigate = useNavigate();

    //const[order, setOrder]=useState<Order>()

    function deleteOrder(id: string) {
        axios.delete("/api/orders/" + id)
            .then(()=>{
                fetchCustomers();
            })
            .catch(error => {
                console.error("Error deleting customer:", error);
            });
    }


    if (!customer) {
        return <div>Kunde nicht gefunden</div>;
    }

    function updateOrder(id: string, order: Order) {
        handleOrder(order)
        navigate("/ChangeOrder/" + id)


    }

    return (
        <div>
            <h1>Bestellungen für {customer.firstname} {customer.lastname}</h1>
            <button onClick={() => navigate("/NewOrderPage/" + customer.id)}>Neue Bestellung</button>
            <table>
                <thead>
                    <tr className="head-line">
                        <td>Bestellnummer</td>
                        <td>Gesamtpreis</td>
                    </tr>
                </thead>
                {customer.customerOrderList.map((order) => (
                    <tbody key={order.id}>
                    <tr>
                        <td>{order.id}</td>
                        <td>{order.price}</td>
                        <td>
                            <button onClick={() => deleteOrder(order.id)}>delete</button>
                            <button onClick={() => updateOrder(order.id, order)}>edit</button>
                        </td>
                    </tr>
                    </tbody>
                ))}
            </table>
        </div>
    );
}