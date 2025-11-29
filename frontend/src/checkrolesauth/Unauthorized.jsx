import React from 'react'
import { Link } from 'react-router-dom'

// if user is not authorized to certain routes then show this page
export default function Unauthorized() {
    return (
        <main>
            <h1 className='text-center max-sm:text-xl'>you are unauthorized to acess this page</h1>
            <Link to='/beartist' className='text-2xl text-center'>be an artist</Link>
        </main>
    )
};