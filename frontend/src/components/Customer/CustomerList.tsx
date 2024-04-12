import {Customer} from "../../types/Customer.ts";
import axios from "axios";
import React, {useState} from "react";
import ChangeCustomer from "./ChangeCustomer.tsx";

type CustomerListProps = {
    customers: Customer[],
    setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>
    updateCustomer: (id: string, firstname: string, lastname: string) => void
}

export default function CustomerList(props: Readonly<CustomerListProps>) {
    const [editMode, setEditMode] = useState(false)
    const [customer, setCustomer] = useState<Customer>()

    function deleteCustomer(id: string) {
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

    function updateCustomer(id: string, firstname: string, lastname: string) {
        props.updateCustomer(id, firstname, lastname)
        setEditMode(false);
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
                                <button onClick={() => deleteCustomer(customer.id)}>delete</button>
                                <button onClick={() => {
                                    setCustomer(customer)
                                    setEditMode(true)
                                }}>Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
                {editMode && customer && <ChangeCustomer customer={customer} updateCustomer={updateCustomer}/>}
            </div>
        </div>
    )
}