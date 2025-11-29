import React from 'react';
import { Link, useParams } from 'react-router-dom';

// ask user to review of response
export default function Reviewsofresponse() {


    // id of ai response
    const { id } = useParams();

    return (
        <>
            <p className='font-extralight'>it can make mistakes review it<Link to={`/suggestion/${id}`}>give your suggestion</Link></p>
        </>
    )
};