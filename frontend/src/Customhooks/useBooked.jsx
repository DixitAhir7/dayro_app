import React, { createContext, useContext } from 'react'

const Bookcontext = createContext("");

export function Bookedcontext({children}) {

    
    return (
        <Bookcontext.Provider value=''>
            {children}
        </Bookcontext.Provider>
    )
};

export const useBooked = () => useContext(Bookcontext);