import { useEffect, useState } from "react";
import getAuth from "../../../utils/auth";
import { useNavigate } from "react-router";

function PrivateAuthRoute({roles, children}) {
    // variables to control the user state
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    // initialize use navigate
    const navigate = useNavigate();
    // Check if the user is authorized and authenticated
    useEffect(() => {
        const checkAuth = async () => {
            const response = await getAuth();

            if (response.employeeToken) {
                setIsLoggedIn(true);
                // Check if user role is authorized
                if (roles.length === 0 || roles.includes(response.employee_role)) {
                    setIsAuthorized(true);
                }
            }
            setIsChecked(true);
        };

        checkAuth();
    }, [roles]);
    // handle redirection based on state
    useEffect(() => {
        if(isChecked) {
            if(!isLoggedIn) {
                navigate("/login")
            } else if(!isAuthorized) {
                navigate("/unauthorized")
            }
        }
    },[isLoggedIn, isAuthorized,isChecked,navigate])
    // Return children if the user is logged in or authorized
    if(!isChecked) {
        return null;
    }
    if(isChecked) {
        return(
            children
        )
    }
    return null
}
export default PrivateAuthRoute;