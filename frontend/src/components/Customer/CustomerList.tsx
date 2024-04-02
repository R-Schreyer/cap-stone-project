import {Customer} from "../../types/Customer.ts";
import axios from "axios";
import React from "react";

type CustomerListProps = {
    customers: Customer[],
    setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>
}
export default function CustomerList(props: Readonly<CustomerListProps>) {
    function deleteCustomer(id: string){
        axios.delete("/api/customers/" + id)
            .then(() => {
                axios.get("/api/customers")
                    .then(response => {
                        props.setCustomers(response.data);
                        console.log("Customer list updated successfully:", response.data);
                    })
                    .catch(error => {
                        console.error("Error loading customers:", error);
                    });
            })
            .catch(error => {
                console.error("Error deleting customer:", error);
            });
    }
    return (
        <div>
            <div className="customer-list">
                <h2>Customer List</h2>
                <table>
                    {props.customers.map((customer) => (
                        <tr>
                            <td>{customer.firstname}</td>
                            <td>{customer.lastname}</td>
                            <td>{customer.id}</td>
                            <td>
                                <button onClick={()=>deleteCustomer(customer.id)}>delete</button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}