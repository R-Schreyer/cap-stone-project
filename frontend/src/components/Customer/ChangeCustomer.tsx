import {FormEvent, useState} from "react";
import {Customer} from "../../types/Customer.ts";

type CustomerChangeProps = {
    customer: Customer,
    updateCustomer: (id: string, firstname: string, lastname: string) => void
}
export default function ChangeCustomer(props: Readonly<CustomerChangeProps>) {

    const[firstname, setFirstname] = useState<string>(props.customer.firstname);
    const[lastname, setLastname] = useState(props.customer.lastname);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.updateCustomer(props.customer.id, firstname, lastname);
    }


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Firstname:
                <input type="text" value={firstname} onChange={(event)=>setFirstname(event.target.value)} />
            </label>
            <label>
                Lastname:
                <input type="text" value={lastname} onChange={(event)=>setLastname(event.target.value)} />
            </label>
            <button type="submit">Save</button>
        </form>
    );
}
/*
import {ChangeEvent, FormEvent, useState, useEffect} from "react";
import axios from "axios";

type ChangeCustomerProps = {
    customerId: string;
}
export default function ChangeCustomer(props: ChangeCustomerProps) {
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: ""
    });
    useEffect(() => {
        displayCustomerInInputFields();
    }, [displayCustomerInInputFields, props.customerId]);

    function displayCustomerInInputFields() {
        axios.get(`/api/customers/${props.customerId}`)
            .then(response => {
                const {firstname, lastname} = response.data;
                setCustomer({firstname, lastname});
            })
            .catch(error => {
                console.error('Error fetching customer:', error);
            });
    }

    function handleChangeFirstname(event: ChangeEvent<HTMLInputElement>) {
        setCustomer({...customer, firstname: event.target.value});
    }

    function handleChangeLastname(event: ChangeEvent<HTMLInputElement>) {
        setCustomer({...customer, lastname: event.target.value});
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.put(`/api/customers/${props.customerId}`, customer)
            .then(() => {
                console.log('Customer updated successfully!');
            })
            .catch(error => {
                console.error('Error updating customer:', error);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Firstname:
                <input type="text" value={customer.firstname} onChange={handleChangeFirstname}/>
            </label>
            <label>
                Lastname:
                <input type="text" value={customer.lastname} onChange={handleChangeLastname}/>
            </label>
            <button type="submit">Save</button>
        </form>
    );
}*/
