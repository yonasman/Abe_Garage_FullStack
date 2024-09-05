// import db config
const conn = require("../Config/dbConfig")
// import bcrypt library
const bcrypt = require("bcrypt")

// function to select and check to existence of employee
async function employeeExits(employeeEmail) {
    const sql = "SELECT * FROM employee WHERE employee_email=?"
    const employee = await conn.query(sql,[employeeEmail])
    if(employee.length > 0) {
        return true
    }
    return false
}
async function createEmployeeService(employeeData) {
    // an object to return the created employee
    let createdEmployee = {}
    // employee data
    const email = employeeData.employee_email
    const password = employeeData.employee_password
    const firstName = employeeData.employee_first_name
    const lastName = employeeData.employee_last_name
    const phone = employeeData.employee_phone
    const status = employeeData.active_employee
    const roleId = employeeData.employee_role_id
    try {
        //  generate salt to hash the password
        const salt = await bcrypt.genSalt(10);
        // hashing password
        const hashedPassword = await bcrypt.hash(password, salt);
        // insert employee email and status
        const query1 = "INSERT INTO employee(employee_email,active_employee)VALUES(?,?)"
        const rows = await conn.query(query1,[email, status])
        console.log(rows)
        if(rows.affectedRows != 1) {
            return false
        }
        // get the employeeId from the insertedId
        const employeeId = rows.insertId
        // Insert the remaining data in to the employee_info, employee_pass, and employee_role tables  
        const query2 = "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
        const rows2 = await conn.query(query2, [employeeId, firstName, lastName, phone]);
        const query3 = "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)";
        const rows3 = await conn.query(query3, [employeeId, hashedPassword]);
        const query4 = "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
        const rows4 = await conn.query(query4, [employeeId, roleId]);
        createdEmployee = {
            employee_Id : employeeId
        }
    } catch (error) {
        console.log(error)
    }
   return createdEmployee
}

module.exports = {employeeExits, createEmployeeService}