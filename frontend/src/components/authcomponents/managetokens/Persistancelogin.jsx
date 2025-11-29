import React, { useEffect } from 'react';
import useToken from './useToken';
import { useAuth } from 'Customhooks/Authprovider';
import { Outlet } from 'react-router-dom';


// if accesstoken not found then refresh token
export default function Persistancelogin() {

    const refresh = useToken();
    const { authdata } = useAuth();

    useEffect(() => {
        const verifytoken = async () => {
            try {
                const refreshtoken = await refresh();
                console.log(refreshtoken);
            } catch (error) {
                console.log(error)
            }
        };

        !authdata.accesstoken && verifytoken();
    }, []);

    return (
        <Outlet />
    )
};