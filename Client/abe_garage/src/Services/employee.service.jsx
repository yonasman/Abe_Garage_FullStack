// import api url
const baseUrl = import.meta.env.VITE_API_URL

async function submit(formData) {
    const options = {
        method:'POST',
        headers : {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify(formData)
    }
    try {
        const response = await fetch(baseUrl + "/api/employee",options);
        if(!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`)
        }
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        throw Error
    }
    
}
const employeeService = {
    submit
}
export default employeeService