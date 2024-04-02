import {Customer} from "../../types/Customer.ts";
import axios from "axios";

type CustomerListProps = {
    customers: Customer[],
}
export default function CustomerList(props: Readonly<CustomerListProps>) {
    function deleteCustomer(id: string){
        axios.delete("/api/customers/" + id)
            .then()
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