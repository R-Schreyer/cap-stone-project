import {Order} from "../../types/Order.ts";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Product} from "../../types/Product.ts";
import {CartItem} from "./NewOrderPage.tsx";
import Big from "big.js";

type OrderChangeProps = {
    order: Order,
    fetchCustomers: () => void,
    products: Product[]
}

export default function ChangeOrder(props: Readonly<OrderChangeProps>) {
    const [orderPrice, setOrderPrice] = useState<string>("0");
    const [cart, setCart] = useState<CartItem[]>(
        props.order.productList.map(product => {
            return {
                product: product,
                quantity: 0
            }
        })
    );

    useEffect(() => {
        const totalPrice = cart.reduce((sum, item) => {
            const itemPrice = new Big(item.product.pricePerPiece.toString());
            const itemQuantity = new Big(item.quantity.toString());
            return sum.plus(itemPrice.times(itemQuantity));
        }, new Big(0));
        setOrderPrice(totalPrice.toFixed(2));
    }, [cart]);

    function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault()
        axios.put("/api/orders" + props.order.id, {
            productList: cart.map(item => ({product: item.product, quantity: item.quantity})),
            price: orderPrice.toString(),
        }).then(() => props.fetchCustomers())

    }

    function addProductToOrder(product: Product) {
        const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
        if (existingItemIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += 1;
            setCart(updatedCart);
        } else {
            setCart([...cart, {product, quantity: 1}]);
        }
    }

    function subtractProductFromOrder(productId: string) {
        const existingItemIndex = cart.findIndex(item => item.product.id === productId);
        if (existingItemIndex !== -1) {
            const updatedCart = [...cart];
            if (updatedCart[existingItemIndex].quantity > 1) {
                updatedCart[existingItemIndex].quantity -= 1;
            } else {
                updatedCart.splice(existingItemIndex, 1);
            }
            setCart(updatedCart);
        }
    }

    return (
        <>
            <div className="change-order-table">
                <div className="product-list">
                    <h2>Produktliste</h2>
                    <table>
                        <thead>
                        <tr className="head-line">
                            <th>Produkt</th>
                            <th>Kategorie</th>
                            <th>Preis</th>
                            <th>Produkt Id</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.productName}</td>
                                <td>{product.category}</td>
                                <td>{product.pricePerPiece}</td>
                                <td>{product.id}</td>
                                <td>
                                    <button onClick={() => addProductToOrder(product)}>+</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className={"cart"}>
                    <h2>Warenkorb</h2>
                    <table>
                        <thead>
                        <tr className="head-line">
                            <th>Produkt</th>
                            <th>Kategorie</th>
                            <th>Preis</th>
                            <th>Produkt Id</th>
                            <th>Anzahl</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cart.map((item) => (
                            <tr key={item.product.id}>
                                <td>{item.product.productName}</td>
                                <td>{item.product.category}</td>
                                <td>{item.product.pricePerPiece}</td>
                                <td>{item.product.id}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <button onClick={() => subtractProductFromOrder(item.product.id)}>-</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <p>Gesamtpreis: </p>
                <p className="order-price">{orderPrice} Euro</p>
                <button onClick={handleSubmit}>Bestellung speichern</button>
            </div>
        </>
    );
}