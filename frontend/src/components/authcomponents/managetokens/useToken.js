import { useAuth } from 'Customhooks/Authprovider';
import { portinstance } from 'axiosinstance/portinstance';


// endpoint to refresh token
function useToken() {

    const { setUserauth, authdata } = useAuth();

    const token = async () => {
        const jwtRes = await portinstance.get('/auth/refresh', { withCredentials: true });

        setUserauth({
            accesstoken: jwtRes.data.data.accesstoken,
            role: jwtRes.data.data.user.role
        });

        return jwtRes.data.data.accesstoken;
    };

    return token;
};

export default useToken;