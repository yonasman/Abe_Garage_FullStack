import { useAuth } from "../../../../Context/authContext"
import LoginForm from "../../Login/LoginForm";

function Employees() {
    const {isLoggedIn, isAdmin} = useAuth();
    if(isLoggedIn){
        if(isAdmin) {
            return (
                <h3>Employees Page</h3>
            )
        } else {
            return (
                <h3>You are not authorized to access this page.</h3>
            )
        }
    } else{
        return (
            <LoginForm/>
        )
    }
}
export default Employees