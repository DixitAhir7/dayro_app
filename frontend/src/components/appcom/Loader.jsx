import React from 'react';
import { FadeLoader } from 'react-spinners';

// state loader untill request is fullfilled
export default function Loader() {
    return (
        <FadeLoader
            color="#e49217"
            height={8.5}
            margin={-2}
            radius={5}
            speedMultiplier={3}
            width={2}
        />
    )
};