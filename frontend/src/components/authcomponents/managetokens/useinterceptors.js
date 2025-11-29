import React, { useEffect } from 'react';
import useToken from './useToken';
import { portinstance } from 'axiosinstance/portinstance';
import { useAuth } from 'Customhooks/Authprovider';


// axiosi intereceptors to check tokens and auth
export default function useinterceptors() {
    const refresh = useToken();
    const { authdata } = useAuth();

    useEffect(() => {
        // before req is sent
        const requestintercept = portinstance.interceptors.request.use(
            config => {
                if (!config.headers.Authorization) {
                    if (authdata.accesstoken) {
                        config.headers.Authorization = authdata.accesstoken
                    }
                };
                // console.log("config:", config.headers.Authorization)
                return config;
            }, (err) => {
                console.log(`got an error while acessing token ${err}`)
            }
        );

        // after req and before response
        const responseinterceptors = portinstance.interceptors.response.use(
            (res) => res,
            async (err) => {
                // console.log("error in interecptors:", err);
                const originalRequest = err?.config;
                if (err.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const refreshdtoken = await refresh();
                    originalRequest.headers.Authorization = refreshdtoken;
                    // console.log("original request:", originalRequest)
                    return portinstance(originalRequest);
                };
            }
        );

        return () => {
            portinstance.interceptors.response.eject(responseinterceptors);
            portinstance.interceptors.request.eject(requestintercept);
        };
    }, []);

    return portinstance;
};