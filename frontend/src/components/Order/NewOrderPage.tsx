import React, {useEffect, useState} from "react";
import {Product} from "../../types/Product.ts";
import {Customer} from "../../types/Customer.ts";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Big from 'big.js';
import './NewOrderPage.css';

type NewOrderPageProps = {
    products: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
    customers: Customer[],
    fetchCustomers: () => void
}

type CartItem = {
    product: Product,
    quantity: number
};

export default function NewOrderPage(props: Readonly<NewOrderPageProps>) {
    const {id} = useParams<{ id: string }>();
    const customer = props.customers.find(customer => customer.id === id);
    const navigate = useNavigate();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [orderPrice, setOrderPrice] = useState<string>('0');

    useEffect(() => {
        const totalPrice = cart.reduce((sum, item) => {
            const itemPrice = new Big(item.product.pricePerPiece.toString());
            const itemQuantity = new Big(item.quantity.toString());
            return sum.plus(itemPrice.times(itemQuantity));
        }, new Big(0));
        setOrderPrice(totalPrice.toFixed(2));
    }, [cart]);

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

    function addOrder() {
        axios.post("/api/orders", {
            productList: cart.map(item => ({product: item.product, quantity: item.quantity})),
            price: orderPrice.toString(),
            orderDate: new Date(),
            customerId: customer?.id
        }).then(() => {
            props.fetchCustomers();
            navigate("/ViewOrders/" + customer?.id);
        });
    }

    return (
        <>
            <div className="new-order-table">
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
                <label>Gesamtpreis: </label>
                <label className="order-price">{orderPrice} Euro</label>
                <button onClick={addOrder}>Bestellung speichern</button>
            </div>
        </>
    );
}


/*import React, { useState, useEffect } from "react";
import { Product } from "../../types/Product.ts";
import { Customer } from "../../types/Customer.ts";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './NewOrderPage.css';

type NewOrderPageProps = {
    products: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
    customers: Customer[],
    fetchCustomers: () => void
}

type CartItem = {
    product: Product,
    quantity: number
};

export default function NewOrderPage(props: Readonly<NewOrderPageProps>) {
    const { id } = useParams<{ id: string }>();
    const customer = props.customers.find(customer => customer.id === id);
    const navigate = useNavigate();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [orderPrice, setOrderPrice] = useState<number>(0);

    useEffect(() => {
        const totalPrice = cart.reduce((sum, item) => sum + item.product.pricePerPiece * item.quantity, 0);
        setOrderPrice(totalPrice);
    }, [cart]);

    function addProductToOrder(product: Product) {
        const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
        if (existingItemIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += 1;
            setCart(updatedCart);
        } else {
            setCart([...cart, { product, quantity: 1 }]);
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

    function addOrder() {
        axios.post("/api/orders", {
            productList: cart.map(item => ({ product: item.product, quantity: item.quantity })),
            price: orderPrice.toString(),
            orderDate: new Date(),
            customerId: customer?.id
        }).then(() => {
            props.fetchCustomers();
            navigate("/ViewOrders/" + customer?.id);
        });
    }

    return (
        <>
            <div className="new-order-table">
                <div className="product-list">
                    <h2>Product List</h2>
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
                        {props.products.map((product, index) => (
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
                <label>Gesamtpreis: </label>
                <label>{orderPrice}</label>
                <button onClick={addOrder}>Bestellung speichern</button>
            </div>
        </>
    );
}*/


/*import React, {useEffect, useState} from "react";
import {Product} from "../../types/Product.ts";
import {Customer} from "../../types/Customer.ts";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import './NewOrderPage.css';

type NewOrderPageProps = {
    products: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
    customers: Customer[]
    fetchCustomers: () => void
}
export default function NewOrderPage(props: Readonly<NewOrderPageProps>) {
    const {id} = useParams<{ id: string }>();
    const customer = props.customers.find(customer => customer.id === id);
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([])
    const [orderPrice, setOrderPrice] = useState<number>(0);

    useEffect(() => {
        // Berechnen des Gesamtpreises, wenn sich die Produkte ändern
        const totalPrice = products.reduce((sum, product) => sum + product.pricePerPiece, 0);
        setOrderPrice(totalPrice);
    }, [products]);

    function addProductToOrder(product: Product) {
        setProducts([...products, product])
    }

    function subtractProductFromOrder(index: number) {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
    }

    console.log(products)

    function addOrder() {
        axios.post("/api/orders", {
            productList: products,
            price: products.reduce((sum, product) => sum + product.pricePerPiece, 0).toString(),
            orderDate: new Date(),
            customerId: customer?.id
        }).then(() => {
            props.fetchCustomers()
            navigate("/ViewOrders/" + customer?.id)
        })

    }

    return (
        <>
            <div className="new-order-table">
                <div className="product-list">
                    <h2>Product List</h2>
                    <table>
                        <>
                            <tr className="head-line">
                                <td>Produkt</td>
                                <td>Kategorie</td>
                                <td>Preis</td>
                                <td>Produkt Id</td>
                            </tr>
                        </>
                        {props.products.map((product, index) => (
                            <tr key={product.id}>
                                <td>{product.productName}</td>
                                <td>{product.category}</td>
                                <td>{product.pricePerPiece}</td>
                                <td>{product.id}</td>
                                <td>
                                    <button onClick={() => addProductToOrder(product)}>+</button>
                                    <button onClick={() => subtractProductFromOrder(index)}>-</button>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
                <div className={"cart"}>
                    <h2>Warenkorb</h2>
                    <table>
                        <>
                            <tr className="head-line">
                                <td>Produkt</td>
                                <td>Kategorie</td>
                                <td>Preis</td>
                                <td>Produkt Id</td>
                            </tr>
                        </>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.productName}</td>
                                <td>{product.category}</td>
                                <td>{product.pricePerPiece}</td>
                                <td>{product.id}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
            <>
                <label>Gesamtpreis: </label>
                <label>{orderPrice}</label>
                <button onClick={addOrder}>Bestellung speichern</button>
            </>
        </>
    )
}*/
