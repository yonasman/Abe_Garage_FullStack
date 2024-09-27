import React,{ useContext, useEffect, useState } from "react"
// import getAuth from auth.js that reads data from local storage
import getAuth from "../utils/auth"
// initialize the context
const AuthContext = React.createContext()
// create a custom hook to use the context
export const useAuth = () => {
    return useContext(AuthContext)
}
// a function to provide the context
export const AuthProvider = function({children}) {
    // states to control user states
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [employee, setEmployee] = useState(null)
    // values that are provided
    const value = {isAdmin, isLoggedIn,employee,setIsAdmin,setIsLoggedIn,setEmployee}
    // set values for the states
    useEffect(() => {
        // retrieve employee data from local storage
        const loggedInEmployee = getAuth();
        loggedInEmployee.then((response) => {
            if(response.employeeToken) {
                setIsLoggedIn(true);
                if(response.employee_role === 1) {
                    setIsAdmin(true);
                }
            }
            setEmployee(response)
        })  
    },[])
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}