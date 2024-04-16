import axios from "axios";
import React from "react";
import {Product} from "../../types/Product.ts";

type ProductListProps = {
    products: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}
export default function ProductList(props: Readonly<ProductListProps>) {
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
    return (
        <div>
            <div className="product-list">
                <h2>Product List</h2>
                <table className="table">
                    <thead>
                        <tr className="head-line">
                            <td>Produkt</td>
                            <td>Kategorie</td>
                            <td>Produkt Id</td>
                            <td>Preis</td>
                        </tr>
                    </thead>
                    {props.products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.productName}</td>
                            <td>{product.category}</td>
                            <td>{product.pricePerPiece}</td>
                            <td>{product.id}</td>
                            <td>
                                <button onClick={() => deleteProduct(product.id)}>delete</button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}