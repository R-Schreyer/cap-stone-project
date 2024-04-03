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
                {/*<li>
                    <Link to={"/workoutplan"}>Workout-Plan</Link>
                </li>*/}
            </ul>
        </nav>
    )
}




/*export default function Navigation(): JSX.Element {
    return (

        <nav className="nav">
            <ul>
                <li>
                    <Link to={"/customer"}>Profile</Link>
                </li>
            </ul>
        </nav>
    )
}*/

