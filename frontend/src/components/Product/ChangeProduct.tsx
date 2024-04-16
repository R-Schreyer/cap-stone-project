import {ChangeEvent, FormEvent, useState} from "react";
import {Product} from "../../types/Product.ts";

type ProductChangeProps = {
    product: Product,
    updateProduct: (id: string, productName: string, category: string, pricePerPiece: number) => void
}

export default function ChangeProduct(props: Readonly<ProductChangeProps>) {
    const [productName, setProductName] = useState<string>(props.product.productName);
    const [category, setCategory] = useState(props.product.category);
    const [pricePerPiece, setPricePerPiece] = useState<number>(0);
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
        props.updateProduct(props.product.id, productName, category, pricePerPiece);
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


            <button type="submit">Save</button>
        </form>
    );
}