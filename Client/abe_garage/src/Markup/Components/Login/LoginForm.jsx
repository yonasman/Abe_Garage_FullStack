import styles from "../../../assets/styles/loginForm.module.css"
function LoginForm() {
    return (
        <>
            <div className={styles.login_wrapper}>
                <h2>Login to your account <span>__</span></h2>
                <input type="email" name="email" id="" placeholder="Email"/>
                <input type="password" name="password" id="" placeholder="Password"/>
                <input className={styles.login_btn} type="submit" value="Login" />
            </div>
        </>
    )
}
export default LoginForm