import axios from "axios";
import React, {useState} from "react";
import {Product} from "../../types/Product.ts";
import ChangeProduct from "./ChangeProduct.tsx";

type ProductListProps = {
    products: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
    updateProduct: (id: string, productName: string, category: string, pricePerPiece: number, producer: string, quantity: string) => void
}
export default function ProductList(props: Readonly<ProductListProps>) {

    const [editMode, setEditMode] = useState(false)
    const [product, setProduct] = useState<Product>()

    function deleteProduct(id: string){
        axios.delete("/api/products/" + id)
            .then(() => {
                axios.get("/api/products")
                    .then(response => {
                        props.setProducts(response.data);
                        console.log("Product list updated successfully:", response.data);
                    })
                    .catch(error => {
                        console.error("Error loading products:", error);
                    });
            })
            .catch(error => {
                console.error("Error deleting product:", error);
            });
    }

    function updateProduct(id: string, productName: string, category: string, pricePerPiece: number, producer: string, quantity: string) {
        props.updateProduct(id, productName, category, pricePerPiece, producer, quantity)
        setEditMode(false);
    }

    return (
        <div>
            <div className="product-list">
                <h2>Produktliste</h2>
                <table className="table">
                    <thead>
                    <tr className="head-line">
                        <td>Produkt</td>
                        <td>Kategorie</td>
                        <td>Preis</td>
                        <td>Hersteller</td>
                        <td>Menge</td>
                        <td>Produkt Id</td>
                    </tr>
                    </thead>
                    {props.products.map((product) => (
                        <tbody key={product.id}>
                        <tr>
                            <td>{product.productName}</td>
                            <td>{product.category}</td>
                            <td>{product.pricePerPiece}</td>
                            <td>{product.producer}</td>
                            <td>{product.quantity}</td>
                            <td>{product.id}</td>
                            <td>
                                <button onClick={() => deleteProduct(product.id)}>delete</button>
                                <button onClick={() => {
                                    setProduct(product);
                                    setEditMode(true);
                                }}>Edit
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    ))}
                </table>
                {editMode && product && <ChangeProduct product={product} updateProduct={updateProduct}/>}

            </div>
        </div>
    )
}