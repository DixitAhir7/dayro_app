import React, { useEffect } from 'react';
import Modal from 'utilits/reusableCode/Modal';

// component for modal -> page in small screens

/**
 * @description
 * how do i detect that model is used?
 * check if modal is used in xx component then take children that is used in Modal and assign it in page
*/
export default function Pages({ children }) {

    useEffect(() => {
        if (Modal) {
            console.log("model is used in this component")
        };
    }, []);

    return (
        <>
            {children}
        </>
    )
};