import React from "react";
import {Product} from "../../types/Product.ts";
import {Customer} from "../../types/Customer.ts";
import {useNavigate} from "react-router-dom";

type NewOrderPageProps = {
    products: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
    customers: Customer[]
}
export default function NewOrderPage(props: Readonly<NewOrderPageProps>) {
    const navigate = useNavigate();

    function addProductToOrder(id: string) {

    }

    function subtractProductFromOrder(id: string) {

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
                                <button onClick={() => addProductToOrder(product.id)}>+</button>
                                <button onClick={() => subtractProductFromOrder(product.id)}>-</button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
            <div className={"cart"}>
                <h2>Warenkorb</h2>
                <table>
                </table>
            </div>
            <button onClick={() => navigate("/ViewOrders/" + customer.id)}>Bestellung speichern</button>
        </div>
    )
}
