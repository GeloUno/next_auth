import { useRef, useState } from "react";
import classes from './auth-form.module.css'
import { IUser } from '../../models/user/IUser';
import { isInValidUserData } from '../../controllers/mongoDB/isInValidUserData';
import { EndPointsUser_Enum, fetcherAuthUser } from "./fecher";

function AuthForm() {
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [isInvalidData, setIsInvalidData] = useState<boolean>(false)

    const inputEmailRef = useRef<HTMLInputElement | null>(null)
    const inputPasswordRef = useRef<HTMLInputElement | null>(null)

    function submitHandler(event: React.FormEvent) {
        event.preventDefault()

        const user: IUser = {
            email: inputEmailRef.current?.value!,
            password: inputEmailRef.current?.value!
        }

        if (isInValidUserData(user)) {
            setIsInvalidData(true)
            return
        }

        if (isLogin) {
            fetcherAuthUser(EndPointsUser_Enum.SIGNIN, user)
                .then(res => console.log(`res`, res))
                .catch(error => console.log(`error`, error))
        } else {
            fetcherAuthUser(EndPointsUser_Enum.SIGNUP, user)
                .then(res => console.log(`result`, res))
                .catch(error => console.log(`error`, error))
        }
    }

    function toggleAuthModeHandler() {
        setIsInvalidData(false)
        setIsLogin(prev => !prev)
    }
    return (
        <section className={classes.auth}>
            <h1>{isLogin ? "Login" : "Sing up"}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label
                        htmlFor="email"
                    >Enter email</label>
                    <input
                        type="text"
                        id="email"
                        ref={inputEmailRef}
                    /></div>
                <div className={classes.control}>
                    <label
                        htmlFor="password"
                    >Enter password</label>
                    <input
                        type="password"
                        id="password"
                        ref={inputPasswordRef}
                    />
                </div>
                {isInvalidData && (<div className={classes.errors}>
                    <p>incorect email or password</p>
                </div>)}
                <div
                    className={classes.actions}>
                    <button type="submit">{isLogin ? "Login" : "Sing up"}</button>
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