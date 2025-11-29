import React from 'react';
import Getvotes from './Getvotes';


// whatever user writes in input that should be displayed here
export default function Suggestednicknames() {
    return (
        <>
            <ul className='p-6 flex'>
                <li className='text-xl list-disc'>dandiya king</li>
                <Getvotes />
            </ul>
        </>
    )
};