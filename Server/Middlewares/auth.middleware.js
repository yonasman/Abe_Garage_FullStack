const jws = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

function VerifyToken(req,res,next) {
    const token = req.headers['x-access-token']
    if(token) {
        jws.verify(token, SECRET_KEY, (err, decode) => {
            if(err) {
                return res.status(401).json({
                    status: "failed",
                    message: "Token verification failed"
                })
            }
            req.body['employee_role'] = decode.employee_role
            next();
        })
    } else {
        
            return res.status(401).json(
                {
                    status : "failed",
                    message : "Token not provided"
                }
            )
    }
}
function isAdmin(req,res,next) {
    const employee_role = req.body.employee_role
    if(employee_role === 1) {
        next();
    } 
    else {
        return res.status(401).json({
            status : "failed",
            message : "Not an Admin"
        })
    }
    
}
module.exports = {
    VerifyToken,
    isAdmin
}