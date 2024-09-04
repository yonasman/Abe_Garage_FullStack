// import install service to work with db 
const installService = require("../Services/install.service");
// install function
async function install(req,res,next) {
    const installMessage = await installService.install()
    console.log(installMessage)
    // check if the installing is successful or not
    if(installMessage.status === 200) {
        res.status(200).json({
            message : installMessage
        })
    } else {
        res.status(500).json({
            message : installMessage
        })
    }
}
module.exports = {install}