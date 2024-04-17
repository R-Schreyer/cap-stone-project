import {ChangeEvent, FormEvent, useState} from "react";
import {Product} from "../../types/Product.ts";

type ProductChangeProps = {
    product: Product,
    updateProduct: (id: string, productName: string, category: string, pricePerPiece: number, producer: string, quantity: string) => void
}

export default function ChangeProduct(props: Readonly<ProductChangeProps>) {
    const [productName, setProductName] = useState<string>(props.product.productName);
    const [category, setCategory] = useState(props.product.category);
    const [pricePerPiece, setPricePerPiece] = useState<number>(props.product.pricePerPiece);
    const [producer, setProducer] = useState(props.product.producer);
    const [quantity, setQuantity] = useState(props.product.quantity);
    const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value);
        // Überprüfe, ob newValue eine gültige Zahl ist

        if (!isNaN(newValue)) {
            // Wenn die Eingabe eine gültige Zahl ist, setzen Sie den Zustand auf diese Zahl
            setPricePerPiece(newValue);
        }
    };

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.updateProduct(props.product.id, productName, category, pricePerPiece, producer, quantity);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={"productName"}>Produktname:</label>
            <input name="firstname" type="text" value={productName}
                   onChange={(event) => setProductName(event.target.value)}/>

            <label htmlFor={"category"}>Kategorie:</label>
            <input name="category" type="text" value={category} onChange={(event) => setCategory(event.target.value)}/>

            <label htmlFor={"pricePerPiece"}>Preis:</label>
            <input name="pricePerPiece" type="text" value={pricePerPiece} onChange={handlePriceChange}/>

            <label htmlFor={"producer"}>Hersteller:</label>
            <input name="producer" type="text" value={producer} onChange={(event) => setProducer(event.target.value)}/>

            <label htmlFor={"quantity"}>Menge:</label>
            <input name="quantity" type="text" value={quantity} onChange={(event) => setQuantity(event.target.value)}/>


            <button type="submit">Save</button>
        </form>
    );
}