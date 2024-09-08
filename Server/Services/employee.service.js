// import db config
const {pool} = require("../Config/dbConfig")
// import bcrypt library
const bcrypt = require("bcrypt")

// function to select and check to existence of employee
async function employeeExits(employeeEmail) {
    const sql = "SELECT * FROM employee WHERE employee_email=?"
    const [employee] = await pool.query(sql,[employeeEmail])
    return employee.length > 0
    
}
async function createEmployeeService(employeeData) {
    // get the connection
    const conn = await pool.getConnection()
    // an object to return the created employee
    let createdEmployee = {}
    // employee data
    const email = employeeData.employee_email
    const password = employeeData.employee_password
    const firstName = employeeData.employee_first_name
    const lastName = employeeData.employee_last_name
    const phone = employeeData.employee_phone
    const status = employeeData.active_employee
    const roleId = employeeData.company_role_id
    const roleName = employeeData.company_role_name
    try {
        // begin db transaction
        await conn.beginTransaction();
        //  generate salt to hash the password
        const salt = await bcrypt.genSalt(10);
        // hashing password
        const hashedPassword = await bcrypt.hash(password, salt);
        // insert employee email and status
        const query1 = "INSERT INTO employee(employee_email,active_employee)VALUES(?,?)"
        const [rows] = await conn.query(query1,[email, status])
        
        if(rows.affectedRows != 1) {
            throw new Error("Failed to insert employee")
        }
        // get the employeeId from the insertedId
        const employeeId = rows.insertId
        // Insert the remaining data in to the employee_info, employee_pass, and employee_role tables  
        const query2 = "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
        const rows2 = await conn.query(query2, [employeeId, firstName, lastName, phone]);
        const query3 = "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)";
        const rows3 = await conn.query(query3, [employeeId, hashedPassword]);
        // check if the company role exists
        const checkRole = "SELECT * FROM company_roles WHERE company_role_id=?"
        const [roleRow] = await conn.query(checkRole,[roleId])
        console.log(roleRow)
        if(roleRow.length == 0) {
            // const insertRoleQuery = "INSERT INTO company_roles (company_role_id, company_role_name) VALUES (?, ?)";
            // await conn.query(insertRoleQuery, [roleId, roleName]);
            throw new Error("company role id doesn't exist")
        }
        const query4 = "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
        const rows4 = await conn.query(query4, [employeeId, roleId]);
        createdEmployee = {
            employee_Id : employeeId
        }
        // commit the transaction
        await conn.commit();
    } catch (error) {
        await conn.rollback();
        console.log(error)
    } finally {
        conn.release()
    }
    return createdEmployee
}
async function getEmployeeByEmail(employeeEmail) {
    try {
        const sql = `SELECT * 
            FROM employee 
            JOIN employee_info ON employee.employee_id = employee_info.employee_id 
            JOIN employee_pass ON employee.employee_id = employee_pass.employee_id 
            JOIN employee_role ON employee.employee_id = employee_role.employee_id 
            WHERE employee.employee_email = ?` 
        const [employee] = await pool.query(sql,[employeeEmail])
        return employee
    } catch (error) {
        console.log(error)
    }
}

module.exports = {employeeExits, createEmployeeService, getEmployeeByEmail}