import React from 'react'
import { Link } from 'react-router-dom'

export default function Btnforartist({ setOpendata, id }) {
    return (
        <>
        <button onClick={setOpendata} type="button">
            open
        </button>
        </>
        // <Link
        //     className='ml-2 bg-gray-300 text-black'
        //     type='button'
        //     to={`/bookedform/${id}`}
        // >
        //     open
        // </Link>
    )
};