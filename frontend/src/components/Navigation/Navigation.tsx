import "./Navigation.css";
import {Link} from "react-router-dom";

export default function Navigation(): JSX.Element {
    return (

        <nav className="nav">
            <ul>
                <li>
                    <Link to={"/customer"}>Profile</Link>
                </li>
            </ul>
        </nav>
    )
}

