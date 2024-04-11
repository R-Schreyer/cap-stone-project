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
            <label>Firstname:</label>
            <input type="text" value={firstname} onChange={(event) => setFirstname(event.target.value)}/>

            <label>Lastname:</label>
            <input type="text" value={lastname} onChange={(event) => setLastname(event.target.value)}/>

            <button type="submit">Save</button>
        </form>
    );
}
