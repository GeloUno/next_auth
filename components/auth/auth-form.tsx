import { useState } from "react";
import classes from './auth-form.module.css'

function AuthForm() {
    const [isLogin, setIsLogin] = useState<boolean>(true)

    function toggleAuthModeHandler() {
        setIsLogin(prev => !prev)
    }
    return (
        <section className={classes.auth}>
            <h1>{isLogin ? "Login" : "Sing up"}</h1>
            <form >
                <div className={classes.control}>
                    <label htmlFor="email">Enter email</label>
                    <input type="text" id="email" /></div>
                <div className={classes.control}>
                    <label htmlFor="password">Enter password</label>
                    <input type="password" id="password" />
                </div>
                <div
                    className={classes.actions}>
                    <button>{isLogin ? "Login" : "Sing up"}</button>
                    <button
                        className={classes.toggle}
                        type={"button"}
                        onClick={toggleAuthModeHandler}
                    >
                        {isLogin ? "Create account" : "Login with existing accout"}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default AuthForm;