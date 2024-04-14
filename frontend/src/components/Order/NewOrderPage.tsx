import axios from "axios";
import React from "react";
import {Product} from "../../types/Product.ts";

type ProductListProps = {
    products: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}
export default function ProductList(props: Readonly<ProductListProps>) {
    function deleteProduct(id: string) {
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
                <table>
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


/*
import { Product } from "../../types/Product";
import { Link } from "react-router-dom";
import {useState} from "react";

function NewOrderPage() {
    // Zustand für den Warenkorb
    const [cart, setCart] = useState([]);

    // Funktion zum Hinzufügen von Produkten zum Warenkorb
    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    // Funktion zum Entfernen von Produkten aus dem Warenkorb
    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.id !== productId));
    };

    // Funktion zum Speichern der Bestellung
    const saveOrder = () => {
        // Hier die Logik zum Speichern der Bestellung implementieren
        console.log("Order saved:", cart);
    };

    return (
        <div>
            <h2>New Order</h2>
            <ul>
                {/!* Produktliste mit Buttons zum Hinzufügen zum Warenkorb *!/}
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price}
                        <button onClick={() => addToCart(product)}>+</button>
                    </li>
                ))}
            </ul>
            {/!* Warenkorb anzeigen *!/}
            <h3>Shopping Cart</h3>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.price}
                        <button onClick={() => removeFromCart(item.id)}>-</button>
                    </li>
                ))}
            </ul>
            {/!* Button zum Speichern der Bestellung *!/}
            <button onClick={saveOrder}>Save Order</button>
            {/!* Zurück zur Produktliste *!/}
            <Link to="/productList">Back to Product List</Link>
        </div>
    );
}

export default NewOrderPage;
*/
