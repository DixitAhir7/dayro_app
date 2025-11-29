import React from 'react';
import { Link, useParams } from 'react-router-dom';

/*
display notifications when artist select user's request,
and redirect user to payment/formid/artist
*/

// notifications for users
export default function Notificationtouser({ notify, bookformid, canceldayro, setOpendata, onlyvtouser }) {
    return (
        <>
            <ul>
                <li className="text-xl">{notify}</li>
            </ul>
            {
                onlyvtouser &&
                <div className='flex'>
                    {/* redirect to payment with bookformid*/}
                    <Link className='text-lg bg-gray-300 md:ml-3' to={`/payment/${bookformid}`}>payment</Link>
                    <Link className='text-lg bg-gray-300 md:ml-3 max-sm:ml-3' to={`/canceloccasion/${bookformid}`}>cancel occasion</Link>
                </div>
            }
        </>
    )
};