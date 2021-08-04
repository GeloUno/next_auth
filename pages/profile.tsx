import UserProfile from '../components/profile/user-profile';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

function profilePage() {
    return (
        <UserProfile />
    );
}

export default profilePage;


export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await getSession({ req: context.req })

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false
            }
        }
    }


    return {
        props: { session }
    }
}