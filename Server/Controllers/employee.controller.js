// import employee service
const {employeeExits,createEmployeeService, getAllEmployeesService} = require("../Services/employee.service")
// a function to control employee creation
async function createEmployee(req,res,next) {
    // employee data
    const email = req.body.employee_email
    // check if the user exists
    try {
        const employee = await employeeExits(email)
        if(employee) {
            const response = {
                    status: 409,
                    message: "Email already exists."
            }
            res.status(409).json(response)
        } else {
            try {
                const addedEmployee = await createEmployeeService(req.body)
                if(Object.keys(addedEmployee).length) {
                    const response = {
                        status : 201,
                        message : "Employee added successfully"
                    }
                    res.status(201).json(response)
                } else {
                    const response = {
                        status: 500,
                        message: "Failed to add employee to the database."
                    }
                    res.status(500).json(response);
                }
            } catch (error) {
                console.log(error)
            }
        }
    } catch (error) {
        console.log(error)
    } 
}
// get all employees controller
async function getAllEmployees(req,res,next) {
    const employeesList = await getAllEmployeesService();
    if(!employeesList) {
        res.status(400).json({
            status : "failed",
            message : "Failed to get Employees"
        })
    } else {
        res.status(200).json({
            status : "success",
            data : employeesList
        })
    }
}
module.exports = {createEmployee, getAllEmployees}