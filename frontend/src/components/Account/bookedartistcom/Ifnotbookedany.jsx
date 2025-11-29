import React from 'react'
import { Link } from 'react-router-dom'


// if user not booked any artist show this in account/bookedartist
export default function Ifnotbookedany() {
    return (
        <>
            <h1 className='md:text-center max-sm:text-2xl'>you haven't booked any artist yet try it now </h1>
            <Link
                className='md:ml-88 mt-3 text-xl border-b w-fit hover:border-b-orange-500 transition-all'
                to='/'>
                book now for your પ્રસંગ
            </Link>
        </>
    )
};