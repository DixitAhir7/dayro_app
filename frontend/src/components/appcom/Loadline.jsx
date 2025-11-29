import React from 'react'
import { BarLoader } from 'react-spinners'
import { useIsMobile } from 'utilits/reusableCode/usefulcode'

export default function Loadline() {

    const isMobile = useIsMobile();

    return (
        <>
            {
                !isMobile &&
                <BarLoader color='rgba(255, 165, 0, 1)' width={"100%"} />
            }
        </>
    )
};