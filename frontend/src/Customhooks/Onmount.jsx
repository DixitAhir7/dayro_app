import React, { createContext, useContext, useState } from 'react';

const CreateMount = createContext("");

export function Onmount({ children }) {

    const [isMount, setMount] = useState(false);

    return (
        <CreateMount.Provider value={{ isMount, setMount }}>
            {children}
        </CreateMount.Provider>
    )
};


export const useMount = () => useContext(CreateMount);