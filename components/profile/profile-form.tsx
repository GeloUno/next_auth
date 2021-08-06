import classes from './profile-form.module.css'
import { useRef, useState } from 'react';

import { isInValidPasswords } from '../../controllers/validators/isInValid';
import { IUserChangePassword } from '../../controllers/fetcher/fecher';

interface ProfileFormProps {
    fetcherChangeUserPassword({ newPassword, oldPassword }: IUserChangePassword): Promise<any>
}

function ProfileForm({ fetcherChangeUserPassword }: ProfileFormProps) {

    const newInputPasswordRef = useRef<HTMLInputElement | null>(null)
    const oldInputPasswordRef = useRef<HTMLInputElement | null>(null)

    const [ErrorChangePassword, setErrorChangePassword] = useState<string | null>(null)
    const [SuccessChangePassword, setSuccessChangePassword] = useState<boolean>(false)

    async function submitHandler(event: React.FormEvent) {
        event.preventDefault()

        const newPassword = newInputPasswordRef.current!.value
        const oldPassword = oldInputPasswordRef.current!.value

        try {

            const isInValid = isInValidPasswords({ newPassword, oldPassword })

            if (isInValid) {
                setErrorChangePassword("invalid data")
                throw new Error("invalid data")
            }

            const result = await fetcherChangeUserPassword({ newPassword, oldPassword })

            if (result) {
                setSuccessChangePassword(true)
            }

        } catch (error) {
            setErrorChangePassword(error?.message)
        }
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="new-password"> New Password</label>
                <input
                    type="text"
                    id="new-password"
                    ref={newInputPasswordRef}
                    onChange={setErrorChangePassword.bind(undefined, null)}
                />
            </div>
            <div className={classes.control}>
                <label
                    htmlFor="old-password"
                >Old password</label>
                <input
                    type="text"
                    id="old-password"
                    ref={oldInputPasswordRef}
                    onChange={() => {
                        setErrorChangePassword(null);
                        setSuccessChangePassword(false)
                    }}
                />
            </div>
            <div
                className={classes.action}
            >
                <button type={'submit'}>Change Password</button>
                {ErrorChangePassword && <p style={{ color: 'red' }}>{ErrorChangePassword}</p>}
                {SuccessChangePassword && <p style={{ color: 'green' }}>Success change password</p>}
            </div>
        </form>
    );
}

export default ProfileForm;