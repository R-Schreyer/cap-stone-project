import {ChangeEvent, FormEvent, useState} from "react";

type CreateNewCustomerProps = {
    postCustomer: (firstname: string, lastname: string, address: string, email: string) => void
}
export default function CreateNewCustomer(props: Readonly<CreateNewCustomerProps>) {
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState<string>("");
    const [email, setEmail] = useState("");

    function handleChangeFirstname(event: ChangeEvent<HTMLInputElement>) {
        console.log(event);
        setFirstname(event.target.value)
    }

    function handleChangeLastname(event: ChangeEvent<HTMLInputElement>) {
        console.log(event);
        setLastname(event.target.value)
    }

    function handleChangeAddress(event: ChangeEvent<HTMLInputElement>) {
        console.log(event);
        setAddress(event.target.value)
    }

    function handleChangeEmail(event: ChangeEvent<HTMLInputElement>) {
        console.log(event);
        setEmail(event.target.value)
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.postCustomer(firstname, lastname, address, email)
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

                <label htmlFor={"address"}>Adresse:</label>
                <input name="address"
                       type="text"
                       value={address}
                       onChange={handleChangeAddress}/>


                <label htmlFor={"email"}>Email:</label>
                <input name="email"
                       type="text"
                       value={email}
                       onChange={handleChangeEmail}/>


                <button>Submit</button>
            </form>
        </div>
    )
}
