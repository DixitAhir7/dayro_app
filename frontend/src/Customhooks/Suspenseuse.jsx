import React, { Suspense } from 'react'
import { BarLoader } from 'react-spinners'

export default function Suspenseuse({ children }) {
    return (
        <Suspense fallback={<BarLoader color='rgba(255, 165, 0, 1)' width={"100%"} />}>
            {children}
        </Suspense>
    )
};