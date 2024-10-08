// import api base url
const baseUrl = import.meta.env.VITE_API_URL

async function logIn(loginData) {
    const options = {
        method : "POST",
        headers : {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify(loginData)
    }
    try {
        const response = await fetch(baseUrl+"/api/employee/login", options);
        if(!response.ok) {
            console.log("Error in sending data")
            throw new Error(`Error: + ${response.status} - ${response.statusText}`)
        }
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        throw Error
    }
}
// log out function
function logOut() {
    localStorage.removeItem('token')
}
const loginService = {
    logIn,logOut
}
export default loginService