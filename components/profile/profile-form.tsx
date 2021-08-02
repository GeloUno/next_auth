import classes from './profile-form.module.css'


function ProfileForm() {
    return (
        <form className={classes.form}>
            <div className={classes.control}>
                <label htmlFor="new-password"> </label>
                <input type="password" id="new-password" />
            </div>
            <div className={classes.control}>
                <label htmlFor="old-password">Old password</label>
                <input type="text" id="old-password" />
            </div>
            <div
                className={classes.action}
            >
                <button>Change Password</button>
            </div>
        </form>
    );
}

export default ProfileForm;