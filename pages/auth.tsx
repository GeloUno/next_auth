import AuthForm from '../components/auth/auth-form';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader'
import CenterContainer from '../containers/center';


function AuthPages() {

    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        getSession().then(session => {
            if (session) {
                router.replace("/profile")
            } else {
                setIsLoading(false)
            }
        })
        return () => {

        }
    }, [router])


    if (isLoading) {
        return (
            <CenterContainer>
                <ScaleLoader height={50} width={4} margin={8} color={'hsl(280, 60%, 50%)'} />
            </CenterContainer>

        )
    }


    return (
        <AuthForm />
    );
}

export default AuthPages;