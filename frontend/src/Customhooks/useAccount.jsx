import useinterceptors from 'components/authcomponents/managetokens/useinterceptors';
import React, { createContext, useContext, useState } from 'react';

const Accountcontext = createContext();

export function Accountcontextp({ children }) {

    const usetoken = useinterceptors();

    const getuserinfo = async (username) => {
        try {
            const userRes = await usetoken.get(`/user/${username}`);
            return userRes;
        } catch (error) {
            console.log("error in accoutn context", error)
        }
    };

    return (
        <Accountcontext.Provider value={{ getuserinfo }}>
            {children}
        </Accountcontext.Provider>
    )
};


export const useAccount = () => useContext(Accountcontext);