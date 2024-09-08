// import login service
const loginService = require("../Services/login.service")
// import jwt
const jwt = require("jsonwebtoken")
// import secret key
const secret_key = process.env.SECRET_KEY

async function login(req,res,next) {
    try {
        const employee = await loginService.login(req.body)
        console.log(employee)
        // if employee doesn't exist
        if(employee.status === "Failed") {
            const response = {
                status : employee.status,
                message : employee.message
        }
        res.status(401).json(response)
    } else {
        // data to send to the client
        const payload = {
            name : employee.data.employee_first_name,
            employee_role : employee.data.employee_role_id
        }
        // sign and generate the token
        const token = jwt.sign(payload, secret_key,{expiresIn:"30d"})
        // employee token
        const tokenData = {
            employeeToken: token
        }
        res.status(200).json({
            status : "success",
            message : "Employee Logged in successfully",
            employeeToken : tokenData
        })
        }
    } catch (error) {
        
    }
}
module.exports = {login}