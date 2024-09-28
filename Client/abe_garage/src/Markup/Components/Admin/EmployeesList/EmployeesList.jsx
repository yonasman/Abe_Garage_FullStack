import {format} from "date-fns"
import {Table, Button} from "react-bootstrap"
import { useAuth } from "../../../../Context/authContext"
import { useEffect, useState } from "react"
import employeeService from "../../../../Services/employee.service"
import styles from "../../../../assets/styles/employee.module.css"
function EmployeesList() {
    // states to handle employee and error
    const [employees, setEmployees] = useState([]);
    // flag for displaying error
    const [apiError, setApiError] = useState(null);

    const [ApiErrorMessage, setApiErrorMessage] = useState(false)
    // extract the employee token from use auth
    const {employee} = useAuth()
    // to store the logged in user
    let token = null
    if(employee) {
        token = employee.employeeToken
    }
    useEffect(() => {
        async function getEmployees() {
            try {
                const response = await employeeService.getAllEmployees(token)
            if(!response.ok) {
                setApiError(true);
                if(response.status === 401) {
                    setApiErrorMessage("Please login again")
                } else if(response.status === 403) {
                    setApiErrorMessage("You're not authorized to access this page.")
                } else {
                    setApiErrorMessage("Please try again later.")
                }
                } else {
                    const res = await response.json()
                    if(res.data.length > 0) {
                        setEmployees(res.data)
                    }
                }
            } catch (error) {
                console.log(error)
            }
            }
        getEmployees()
    },[])
    return (
        <>
            {apiError ? (
            <section className="contact-section">
                <div className="auto-container">
                    <div className="contact-title">
                        <h2>{ApiErrorMessage}</h2>
                    </div>
                </div> 
            </section>
            ):
            <>
                <section className="contact-section">
                    <div className="auto-container">
                        <div className="contact-title">
                            <h2>Employees</h2>
                        </div>
                        <Table striped bordered hover className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Active</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Added Date</th>
                                    <th>Role</th>
                                    <th>Edit/Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees?.map((employee) => {
                                    return (<tr key={employee.employee_id}>
                                        <td>{employee.active_employee? "Yes" : "No"}</td>
                                        <td>{employee.employee_first_name}</td>
                                        <td>{employee.employee_last_name}</td>
                                        <td>{employee.employee_email}</td>
                                        <td>{employee.employee_phone}</td>
                                        <td>{format(new Date(employee.added_date), 'MM - dd - yyyy | kk:mm')}</td>
                                        <td>{employee.company_role_name}</td>
                                        <td>
                                            <div className="edit-delete-icons">
                                                Edit | Delete
                                            </div>
                                        </td>
                                    </tr>)
                                })}
                            </tbody>
                        </Table>
                    </div>
                </section>
            </>
            }
        </>
    )
}
export default EmployeesList