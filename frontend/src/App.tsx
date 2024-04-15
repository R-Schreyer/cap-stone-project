import CustomerList from "./components/Customer/CustomerList.tsx";
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
        // Hier die Logik zur Verarbeitung der Bestellliste einfügen
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
                <Route path={"/ViewOrders/:id"} element={<ViewOrders customers={customers}/>}/>
                <Route path={"NewOrderPage/:id"} element={<NewOrderPage products={products}
                                                                        setProducts={setProducts}
                                                                        customers={customers}/>}/>
            </Routes>
        </>
    )
}
