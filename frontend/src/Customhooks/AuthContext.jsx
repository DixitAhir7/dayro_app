import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { portinstance } from "axiosinstance/portinstance";

const AuthContext = createContext(null);


export const Authproviderhook = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);
    const [loading, setLoading] = useState(true);

    portinstance.interceptors.response.use(
        res => res,
        async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const newAccessToken = await refreshToken();
                    if (newAccessToken) {
                        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                        return api(originalRequest);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            return Promise.reject(error);
        }
    );

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) return null;
        try {
            const res = await portinstance.get("/refresh");
            const newAccessToken = res.data.accessToken;
            setAccessToken(newAccessToken);
            return newAccessToken;
        } catch (error) {
            console.error("Refresh token expired or invalid", error);
            logout();
            return null;
        }
    };


    useEffect(() => {
        const init = async () => {
            if (!accessToken && localStorage.getItem("refreshToken")) {
                await refreshToken();
            }
            setLoading(false);
        };
        init();
    }, []);


    return (
        <AuthContext.Provider value={{
            user,
            accessToken,
            setAccessToken,
            setLoading,
            setUser
        }}>
            {children}
        </AuthContext.Provider>
    )
};


export const useAuthprovide = () => useContext(AuthContext);