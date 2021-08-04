import ProfileForm from './profile-form';
import classes from './user-profile.module.css'
import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';


function UserProfile() {

    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        getSession().then(session => {
            setIsLoading(false)
            if (!session) {
                window.location.href = "/auth"
            }
        })
        return () => {
        }
    }, [])


    if (isLoading) {
        return <p className={classes.profile}>loading...</p>
    }

    return (
        <section className={classes.profile}>
            <h1>Your user profile</h1>
            <ProfileForm />
        </section>
    );
}

export default UserProfile;