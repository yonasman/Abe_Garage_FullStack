import { useAuth } from "../../../Context/authContext"
import LoginForm from "../../Components/Login/LoginForm";
// const baseUrl = import.meta.env.VITE_API_URL;
import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu"
import EmployeesList from "../../Components/Admin/EmployeesList/EmployeesList";
function Employees() {
    const {isLoggedIn, isAdmin} = useAuth();
    // fetch(`${baseUrl}`)
    if(isLoggedIn){
        if(isAdmin) {
            return (
                <div>
                    <div className="container-fluid admin-pages">
                        <div className="row">
                            <div className="col-md-3 admin-left-side">
                                <AdminMenu/>
                            </div>
                            <div className="col-md-9 admin-right-side">
                                    <h1><EmployeesList/></h1>
                            </div>
                        </div>
                    </div>
                </div>
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