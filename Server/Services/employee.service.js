// import db config
const conn = require("../Config/dbConfig")

// function to select and check to existence of employee
async function employeeExits(employeeEmail) {
    const sql = "SELECT * FROM employee WHERE employee_email=?"
    const employee = conn.query(sql,[employeeEmail])
    if(employee.length > 0) {
        return true
    }
    return false
}
async function createEmployee(employeeData) {
    // employee data
    const email = employeeData.employee_email
    const password = employeeData.employee_password
    const firstName = employeeData.employee_first_name
    const lastName = employeeData.employee_last_name
    const phone = employeeData.employee_phone

    const sql = "INSERT INTO employee(employee_email, active_employee,added_date"
    const row = conn.query(sql,[])
}

module.exports = {employeeExits, createEmployee}