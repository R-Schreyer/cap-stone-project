import {Customer} from "../../types/Customer.ts";
import axios from "axios";
import React, {useState} from "react";
import ChangeCustomer from "./ChangeCustomer.tsx";
import {Order} from "../../types/Order.ts";
import ViewOrders from "../Order/ViewOrders.tsx";


type CustomerListProps = {
    customers: Customer[],
    setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>
    updateCustomer: (id: string, firstname: string, lastname: string, address: string, email: string) => void
    sendCustomerOrderList: (orderList: Order[]) => void;
}

export default function CustomerList(props: Readonly<CustomerListProps>) {
    const [editMode, setEditMode] = useState(false)
    const [customer, setCustomer] = useState<Customer>()
    const [customerOrderList, setCustomerOrderList] = useState<Order[]>([])
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

    function updateCustomer(id: string, firstname: string, lastname: string, address: string, email: string) {
        props.updateCustomer(id, firstname, lastname, address, email)
        setEditMode(false);
    }

    function handleViewOrdersClick(customerId: string) {
        const selectedCustomer = props.customers.find(customer => customer.id === customerId);
        if (selectedCustomer) {
            setCustomerOrderList(selectedCustomer.customerOrderList);
            props.sendCustomerOrderList(selectedCustomer.customerOrderList);
        }
    }

    return (
        <div>
            <div className="customer-list">
                <h2>Customer List</h2>
                <table>
                    {props.customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.firstname}</td>
                            <td>{customer.lastname}</td>
                            <td>{customer.address}</td>
                            <td>{customer.email}</td>
                            <td>
                                <button onClick={() =>
                                    deleteCustomer(customer.id)
                                }>delete
                                </button>
                                <button onClick={() => {
                                    setCustomer(customer)
                                    setEditMode(true)
                                }}>Edit
                                </button>
                                <button onClick={() => handleViewOrdersClick(customer.id)}>View Orders</button>
                            </td>
                        </tr>
                    ))}
                </table>
                {editMode && customer && <ChangeCustomer customer={customer} updateCustomer={updateCustomer}/>}
                {customerOrderList.length > 0 && <ViewOrders customerOrderList={customerOrderList}/>}
            </div>
        </div>
    )
}