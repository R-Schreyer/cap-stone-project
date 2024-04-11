import {ChangeEvent, FormEvent, useState} from "react";

type CreateNewProductProps = {
    postProduct: (productName: string, category: string, pricePerPiece: number | null) => void
}

export default function CreateNewProduct(props: Readonly<CreateNewProductProps>) {
    const [productName, setProductName] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [pricePerPiece, setPricePerPiece] = useState<number | null>(null)

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

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.postProduct(productName, category, pricePerPiece)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Produktname:
                    <input type="text"
                           value={productName}
                           onChange={handleChangeProductName}/>
                </label>
                <label>Kategorie:
                    <input type="text"
                           value={category}
                           onChange={handleChangeCategory}/>
                </label>
                <label>Preis:
                    <input type="number"
                           step="0.01"
                           value={pricePerPiece !== null ? pricePerPiece.toString() : ''}
                           onChange={handleChangePricePerPiece}/>
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}