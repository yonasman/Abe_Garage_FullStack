import { useState } from "react";
import styles from "../../../assets/styles/loginForm.module.css"
import loginService from "../../../Services/login.service";
import { useNavigate} from 'react-router-dom';


function LoginForm() {
    // variables to store states
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [serverError, setServerError] = useState("")
    // initialize use navigate
    const navigate = useNavigate()
    // function to handle login
    async function handleLogin(e) {
        // prevent default permission
        e.preventDefault();
        // variable to check validity
        let valid = true
        // handle password error
        if(!password || password.length < 6) {
            setPasswordError("Password must be greater than 6 characters long")
            valid = false
        } else {
            setPasswordError("")
        }
        // handle email
        const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(!emailRegEx.test(email)) {
            setEmailError("Invalid email")
            valid = false
        } else {
            setEmailError("")
        }
        // login data
        const loginData = {
            email,
            password
        }
        
        // if valid
        if(valid) {
            try {
                const res = await loginService.logIn(loginData)
                setSuccess(res.message)
                setServerError("")
                localStorage.setItem("token",JSON.stringify(res.employeeToken))
                setTimeout(() => {
                    navigate("/")
                },2000)
            } catch (error) {
                setServerError("Failed to login. Please try again.")
                console.log(error)
            }
            
        }
    }
    return (
        <>
            <div className={styles.login_wrapper}>
                <h2>Login to your account <span>__</span></h2>
                <form onSubmit={handleLogin}>
                    {serverError && <div className={styles.valid_error}>{serverError}</div>}
                    {success && <div className={styles.success_msg}>{success}</div>}
                    {emailError && <div className={styles.valid_error}>{emailError}</div>}
                    <input type="email" name="email" id="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    {passwordError && <div className={styles.valid_error}>{passwordError}</div>}
                    <input type="password" name="password" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <input className={styles.login_btn} type="submit" value="Login" />
                </form>
            </div>
        </>
    )
}
export default LoginForm