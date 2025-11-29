import React from 'react';

// only show payment if it's paid
export default function Paymentcard({
    amount
}) {
    return (
        <>
                <p>you paid {amount} amoun get it back</p>
                <button className='md:ml-3' type='button'>get back</button>
        </>
    )
};