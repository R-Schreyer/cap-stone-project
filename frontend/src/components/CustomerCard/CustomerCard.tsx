import {Customer} from "../../types/Customer.ts";


type WorkoutCardProps = {
    customer: Customer
}
export default function CustomerCard({customer}: Readonly<WorkoutCardProps>){
    /*const navigate = useNavigate();
    function goToWorkoutDetailsPage(id: string) {
        navigate("/workouts/" + id);
    }*/

    return (
        <div>
            <p>Vorname: {customer.firstname}</p>
            <p>Nachname: {customer.lastname}</p>
            <p>ID: {customer.id}</p>
        </div>

    )
}