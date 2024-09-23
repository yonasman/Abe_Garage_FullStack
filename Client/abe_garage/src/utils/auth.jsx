// utility function to read and decode jws token from local storage
const getAuth = async function() {
    const employee =  JSON.parse(localStorage.getItem('token'));
    if(employee && employee.employeeToken) {
        const employeeData = decodeJwsToken(employee.employeeToken);
        employee.employeeName = employeeData.name;
        employee.employeeRole = employeeData.employee_role;
        return employee
    } else {
        return {}
    }

}

// a function to decode the base64url
const base64UrlDecode = function(str) {
    // Replace '-' with '+', '_' with '/', then decode the base64 string
    const base64 = str.replace(/-/g,'+').replace(/_/,'/');
    // decode base64 string
    const decodedData = atob(base64)
    // Convert Base64 decoded string into a UTF-8 string
    const jsonPayload = decodeURIComponent(
    Array.from(decodedData)
        .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return jsonPayload
}
// function to split the token and extract the payload
const decodeJwsToken = function(token) {
    const parts = token.split('.')
    // if the token does'nt have all its components
    if(parts.length !== 3) {
        throw new Error("Not a valid token")
    }
    const payload = parts[1]
    const decodedPayload = base64UrlDecode(payload)
    return JSON.parse(decodedPayload)
}
export default getAuth