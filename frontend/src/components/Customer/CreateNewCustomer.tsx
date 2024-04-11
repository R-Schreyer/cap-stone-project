import {ChangeEvent, FormEvent, useState} from "react";

type CreateNewCustomerProps = {
    postCustomer: (firstname: string, lastname: string) => void
}
export default function CreateNewCustomer(props: Readonly<CreateNewCustomerProps>) {
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState("");

    function handleChangeFirstname(event: ChangeEvent<HTMLInputElement>) {
        console.log(event);
        setFirstname(event.target.value)
    }

    function handleChangeLastname(event: ChangeEvent<HTMLInputElement>) {
        console.log(event);
        setLastname(event.target.value)
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.postCustomer(firstname, lastname)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Vorname:</label>
                <input type="text"
                       value={firstname}
                       onChange={handleChangeFirstname}/>

                <label>Nachname:</label>
                <input type="text"
                       value={lastname}
                       onChange={handleChangeLastname}/>

                <button>Submit</button>
            </form>
        </div>
    )
}
