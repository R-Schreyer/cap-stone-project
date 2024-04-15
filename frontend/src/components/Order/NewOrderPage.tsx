import React, {useState} from "react";
import {Product} from "../../types/Product.ts";
import {Customer} from "../../types/Customer.ts";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

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

    function addProductToOrder(product: Product) {
        setProducts([...products, product])
    }

    function subtractProductFromOrder(index: number) {
        setProducts([...products.slice(0, index), ...products.slice(index + 1)])
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


        // List<Product> productList, BigDecimal price, Date orderDate, String customerId
    }
    return (
        <div>
            <div className="product-list">
                <h2>Product List</h2>
                <table>
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
            <button onClick={addOrder}>Bestellung speichern</button>
        </div>
    )
}
