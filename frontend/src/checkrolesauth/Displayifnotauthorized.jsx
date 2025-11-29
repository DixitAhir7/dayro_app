import React from 'react';
import { useAuth } from 'Customhooks/Authprovider';
import { Navigate } from 'react-router-dom';


// check role
export default function Displayifnotauthorized({ children }) {

    const { authdata } = useAuth();
    // console.log(authdata)

    if (authdata.role !== "artist") {
        return <Navigate to='/unauthorized' replace />
    } else {
        return children;
    };
};