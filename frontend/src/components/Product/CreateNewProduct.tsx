import {ChangeEvent, FormEvent, useState} from "react";

type CreateNewProductProps = {
    postProduct: (productName: string, category: string, pricePerPiece: number | null, producer: string, quantity: string) => void
}

export default function CreateNewProduct(props: Readonly<CreateNewProductProps>) {
    const [productName, setProductName] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [pricePerPiece, setPricePerPiece] = useState<number | null>(null)
    const [producer, setProducer] = useState<string>("")
    const [quantity, setQuantity] = useState<string>("")

    function handleChangeProductName(event: ChangeEvent<HTMLInputElement>) {
        console.log(event);
        setProductName(event.target.value)
    }

    function handleChangeCategory(event: ChangeEvent<HTMLInputElement>) {
        console.log(event);
        setCategory(event.target.value)
    }

    function handleChangePricePerPiece(event: ChangeEvent<HTMLInputElement>) {
        console.log(event);
        const newValue = parseFloat(event.target.value);
        setPricePerPiece(isNaN(newValue) ? null : newValue)
    }

    function handleChangeProducer(event: ChangeEvent<HTMLInputElement>) {
        console.log(event);
        setProducer(event.target.value)
    }

    function handleChangeQuantity(event: ChangeEvent<HTMLInputElement>) {
        console.log(event);
        setQuantity(event.target.value)
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.postProduct(productName, category, pricePerPiece, producer, quantity)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor={"productName"}>Produktname:</label>
                <input name={"productName"}
                       type="text"
                       value={productName}
                       onChange={handleChangeProductName}/>

                <label htmlFor={"category"}>Kategorie:</label>
                <input name={"category"}
                       type="text"
                       value={category}
                       onChange={handleChangeCategory}/>

                <label htmlFor={"pricePerPiece"}>Preis:</label>
                <input name={"pricePerPiece"}
                       type="number"
                       step="0.01"
                       value={pricePerPiece !== null ? pricePerPiece.toString() : ''}
                       onChange={handleChangePricePerPiece}/>

                <label htmlFor={"producer"}>Hersteller:</label>
                <input name={"producer"}
                       type="text"
                       value={producer}
                       onChange={handleChangeProducer}/>

                <label htmlFor={"quantity"}>Menge:</label>
                <input name={"quantity"}
                       type="text"
                       value={quantity}
                       onChange={handleChangeQuantity}/>

                <button>Submit</button>
            </form>
        </div>
    )
}