// import Header from "./components/Header/Header.tsx";
import CustomerList from "./components/Customer/CustomerList.tsx";
import Layout from "./components/Layout/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import CreateNewCustomer from "./components/CreateNewCustomer/CreateNewCustomer.tsx";
import {useEffect, useState} from "react";
import {Customer} from "./types/Customer.ts";
import axios from "axios";
import "./App.css";

export default function App() {

    const [customers, setCustomers] = useState<Customer[]>([])


    function postCustomer(firstname: string, lastname: string) {
        axios.post("/api/customers",{
            firstname: firstname,
            lastname: lastname
        })
            .then(() => fetchCustomers())
    }

    /*const navigate = useNavigate();

    function navigateToCreateNewCustomer() {
        navigate("/CreateNewCustomer");
    }*/
    function fetchCustomers() {
        axios.get("/api/customers").then(response => setCustomers(response.data))
    }

    useEffect(() => {
        fetchCustomers();
    }, []);
    console.log("Kunden: ", customers);
    return (

        <Layout>
            <Routes>
                <Route path="/customerList" element={<CustomerList customers={customers}/>}/>
                <Route path="/createNewCustomer" element={<CreateNewCustomer postCustomer={postCustomer}/>}/>
                {/*<Route path="/workouts" element={<Workouts workouts={workouts}/>}/>
                <Route path="/workouts/:id" element={<WorkoutDetailsPage/> }/>*/}
            </Routes>
        </Layout>

    )
}

/*import Header from "./components/Header/Header.tsx";
import CustomerList from "./components/Customer/CustomerList.tsx";

export default function App() {

    return (
        <>
            <Header></Header>
            <body>
            <CustomerList></CustomerList>
            </body>
        </>

    )
}*/
