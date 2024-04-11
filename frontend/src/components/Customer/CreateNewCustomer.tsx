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
                <label htmlFor={"firstname"}>Vorname:</label>
                <input name="firstname"
                       type="text"
                       value={firstname}
                       onChange={handleChangeFirstname}/>

                <label htmlFor={"lastname"}>Nachname:</label>
                <input name="lastname"
                       type="text"
                       value={lastname}
                       onChange={handleChangeLastname}/>

                <button>Submit</button>
            </form>
        </div>
    )
}
