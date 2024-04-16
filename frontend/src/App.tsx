import {useNavigate, useParams} from 'react-router-dom';
import {Customer} from "./types/Customer.ts";
import axios from "axios";
import {Order} from "./types/Order.ts";
import React from "react";

type ViewOrdersProps = {
    customers: Customer[];
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>
}

export default function ViewOrders({customers, orders, setOrders}: Readonly<ViewOrdersProps>) {
    const {id} = useParams<{ id: string }>();
    const customer = customers.find(customer => customer.id === id);
    const navigate = useNavigate();

    function deleteOrder(id: string) {
        axios.delete("/api/orders/" + id)
            .then(() => {
                axios.get("/api/orders")
                    .then(response => {
                        setOrders(response.data);
                    })
                    .catch(error => {
                        console.error("Error loading orders:", error);
                    });
            })
            .catch(error => {
                console.error("Error deleting order:", error);
            });
    }

    if (!customer) {
        return <div>Kunde nicht gefunden</div>;
    }

    return (
        <div>
            <h1>Bestellungen für {customer.firstname} {customer.lastname}</h1>
            <button onClick={() => navigate("/NewOrderPage/" + customer.id)}>Neue Bestellung</button>
            <table>
                <thead>
                <tr className="head-line">
                    <td>Bestellnummer</td>
                    <td>Gesamtpreis</td>
                </tr>
                </thead>
                {customer.customerOrderList.map((order) => (
                    <tbody key={order.id}>
                    <tr>
                        <td>{order.id}</td>
                        <td>{order.price}</td>
                        <td>
                            <button onClick={() => deleteOrder(order.id)}>delete</button>
                        </td>
                    </tr>
                    </tbody>
                ))}
            </table>
        </div>
    );
}


/*import CustomerList from "./components/Customer/CustomerList.tsx";
import Layout from "./components/Layout/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import CreateNewCustomer from "./components/Customer/CreateNewCustomer.tsx";
import {useEffect, useState} from "react";
import {Customer} from "./types/Customer.ts";
import axios from "axios";
import "./App.css";
import CreateNewProduct from "./components/Product/CreateNewProduct.tsx";
import ProductList from "./components/Product/ProductList.tsx";
import {Product} from "./types/Product.ts";
import ViewOrders from "./components/Order/ViewOrders.tsx";
import NewOrderPage from "./components/Order/NewOrderPage.tsx";
import CustomerOrders from "./components/Customer/CustomerOrders.tsx";

export default function App() {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [products, setProducts] = useState<Product[]>([])

    function updateCustomer(id: string, firstname: string, lastname: string, address: string, email: string) {
        axios.put("/api/customers/" + id,{
            firstname: firstname,
            lastname: lastname,
            address: address,
            email: email
        })
            .then(()=>fetchCustomers())

        console.log("Updated customer:", firstname, lastname, address, email);
    }

    function postCustomer(firstname: string, lastname: string, address: string, email: string) {
        axios.post("/api/customers",{
            firstname: firstname,
            lastname: lastname,
            address: address,
            email: email
        })
            .then(() => fetchCustomers())
    }
    function fetchCustomers() {
        axios.get("/api/customers").then(response => setCustomers(response.data))
    }
    useEffect(() => {
        fetchCustomers();
    }, []);
    console.log("Kunden: ", customers);
    function postProduct(productName: string, category: string, pricePerPiece: number|null) {
        axios.post("/api/products",{
            productName: productName,
            category:  category,
            pricePerPiece: pricePerPiece
        })
            .then(() => fetchProducts())
    }
    function fetchProducts() {
        axios.get("/api/products").then(response => setProducts(response.data))
    }
    useEffect(() => {
        fetchProducts();
    }, []);
    console.log("Kunden: ", customers);


// eslint-disable-next-line @typescript-eslint/no-explicit-any
    function sendCustomerOrderList(orderList: any) {
        console.log("Received customer order list:", orderList);
    }
    
    return (
        <>
        <Layout>
            <Routes>
                <Route path="/customerList" element={<CustomerList updateCustomer={updateCustomer} customers={customers}
                                                                   setCustomers={setCustomers}
                                                                   sendCustomerOrderList={sendCustomerOrderList}/>}/>
                <Route path="/createNewCustomer" element={<CreateNewCustomer postCustomer={postCustomer}/>}/>
                <Route path="/productList" element={<ProductList products={products} setProducts={setProducts}/>}/>
                <Route path="/createNewProduct" element={<CreateNewProduct postProduct={postProduct}/>}/>
            </Routes>
        </Layout>
            <Routes>
                <Route path={"/ViewOrders/:id"} element={<ViewOrders customers={customers}
                orders={CustomerOrders}/>}/>
                <Route path={"NewOrderPage/:id"} element={<NewOrderPage products={products}
                                                                        setProducts={setProducts}
                                                                        customers={customers}
                                                                        fetchCustomers={fetchCustomers}/>}/>
            </Routes>
        </>
    )
}*/
