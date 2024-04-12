import "./Navigation.css";

import {Link} from "react-router-dom";
export default function Navigation(): JSX.Element{
    return (
        <nav className="nav">
            <ul>
                <li>
                    <Link to={"/CustomerList"}>Kundenliste</Link>
                </li>
                <li>
                    <Link to={"/CreateNewCustomer"}>Kunden erstellen</Link>
                </li>
                <li>
                    <Link to={"/ProductList"}>Produktliste</Link>
                </li>
                <li>
                    <Link to={"/CreateNewProduct"}>Produkt erstellen</Link>
                </li>
            </ul>
        </nav>
    )
}