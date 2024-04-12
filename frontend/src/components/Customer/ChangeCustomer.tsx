import {FormEvent, useState} from "react";
import {Customer} from "../../types/Customer.ts";

type CustomerChangeProps = {
    customer: Customer,
    updateCustomer: (id: string, firstname: string, lastname: string, address: string, email: string) => void
}

export default function ChangeCustomer(props: Readonly<CustomerChangeProps>) {
    const[firstname, setFirstname] = useState<string>(props.customer.firstname);
    const[lastname, setLastname] = useState(props.customer.lastname);
    const [address, setAddress] = useState(props.customer.address);
    const [email, setEmail] = useState(props.customer.email);
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.updateCustomer(props.customer.id, firstname, lastname, address, email);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={"firstname"}>Vorname:</label>
            <input name="firstname" type="text" value={firstname}
                   onChange={(event) => setFirstname(event.target.value)}/>

            <label htmlFor={"lastname"}>Nachname:</label>
            <input name="lastname" type="text" value={lastname} onChange={(event) => setLastname(event.target.value)}/>

            <label htmlFor={"address"}>Adresse:</label>
            <input name="address" type="text" value={address} onChange={(event) => setAddress(event.target.value)}/>

            <label htmlFor={"email"}>Email:</label>
            <input name="email" type="text" value={email} onChange={(event) => setEmail(event.target.value)}/>


            <button type="submit">Save</button>
        </form>
    );
}
