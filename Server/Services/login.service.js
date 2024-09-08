// import db config
const conn = require("../Config/dbConfig")
// import employee service to get the employee by email
const employeeService = require("../Services/employee.service")
// import bcrypt to compare password
const bcrypt = require("bcrypt")

async function login(employeeData) {
    try {
        // a variable to store data to return to the controller
        let returnData = {}
        // employee data
        const email = employeeData.employee_email
        const password = employeeData.employee_password

        const employee = await employeeService.getEmployeeByEmail(email)
        console.log(employee)
        // check if the employee exists
        if(employee.length == 0) {
            returnData = {
                status : "Failed",
                message : "Employee doesn't exist"
            }
            return returnData
        }
        const passwordMatch = bcrypt.compare(password, employee.employee_password_hashed)
        // check if the password is correct
        if(!passwordMatch) {
            returnData = {
                status : "failed",
                message : "password incorrect"
            }
            return returnData
        }
        returnData = {
            status : "success",
            data : employee
        }
        return returnData
    } catch (error) {
        console.log(error)
    }
}
module.exports = {login}