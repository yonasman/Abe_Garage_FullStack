// import employee service
const {employeeExits,createEmployeeService} = require("../Services/employee.service")
// a function to control employee creation
async function createEmployee(req,res,next) {
    // employee data
    const email = req.body.email
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
                if(addedEmployee.length > 0) {
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
module.exports = {createEmployee}