import ProfileForm from './profile-form';
import classes from './user-profile.module.css'

import { fetcherChangeUserPassword } from '../../controllers/fetcher/fecher';

function UserProfile() {

    return (
        <section className={classes.profile}>
            <h1>Your user profile</h1>
            <ProfileForm fetcherChangeUserPassword={fetcherChangeUserPassword} />
        </section>
    );
}

export default UserProfile;

