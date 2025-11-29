import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAuth } from 'customhooks/Authprovider';
import useToken from 'components/authcomponents/managetokens/useToken';

export default function Applayout() {

    const refresh = useToken();
    const { authdata } = useAuth();
    // console.log("authdata in main app component", authdata);

    /**
     * when user has logged in then check that is accestoken expired?
     * call this hook to refresh token
    */
    useEffect(() => {
        const verifytoken = async () => {
            try {
                const refreshtoken = await refresh();
                // console.log(refreshtoken)
                return refreshtoken;
            } catch (error) {
                console.log(error)
            }
        };

        !authdata.accesstoken && verifytoken();
    }, []);

    return (
        <>
            <Sidebar />
            <Outlet />
            {/* <Footer /> */}
        </>
    )
};