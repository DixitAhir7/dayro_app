import React from 'react';
import { Link, useLocation } from 'react-router-dom';


// if user not logged in then show this page
export default function Showpagetoauth() {

    return (
        <main>
            <div>
                <h1 className='text-center max-sm:text-xl'>people who are logged in are able to do anything in this app</h1>
            </div>
            <div className="flex justify-center mt-4">
                <Link className='text-2xl' to='/signin'>signin</Link>
                {/* <Link to="/registerinfo" className='ml-[10px] mt-[3px] text-lg hover:underline'>see why do you need to signin</Link> */}
            </div>
        </main>
    )
};