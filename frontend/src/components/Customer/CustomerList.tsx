import {Customer} from "../../types/Customer.ts";
import {useEffect, useState} from "react";
import axios from "axios";


export default function CustomerList() {
const [customers, setCustomers] = useState<Customer[]>([])

    useEffect(() => {
        axios.get("/api/customers").then(response=> {
            setCustomers(response.data)
        })
    }, []);
    console.log("Kunden: ", customers);

    return (
        <div className="customer-list">
            <h2>Customer List</h2>
            <ul className="customer">
                {customers.map((customer) => (
                    <li key={customer.id}>
                        <span>{customer.firstname}</span>
                        <span>{customer.lastname}</span>
                        <span>{customer.id}</span>
                    </li>
                ))}
            </ul>
            <table>
                {customers.map((customer) => (
                    <tr>
                        <td>{customer.firstname}</td>
                        <td>{customer.lastname}</td>
                        <td>{customer.id}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}