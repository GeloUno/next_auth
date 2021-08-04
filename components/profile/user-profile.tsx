import ProfileForm from './profile-form';
import classes from './user-profile.module.css'

function UserProfile() {
    return (
        <section className={classes.profile}>
            <h1>Your user profile</h1>
            <ProfileForm />
        </section>
    );
}

export default UserProfile;