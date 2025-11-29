import React, { useState } from 'react';

// form for update, editing form of booked artist info
export default function Updatebookedform({
    register,
    submitupdate
}) {
    return (
        <>
            <input
                {...register('Name')}
                placeholder='edit name'
                type="text"
            />
            <input
                {...register('occasionName')}
                placeholder='change occasion'
                type="text"
            />

            <input
                {...register('phoneNo')}
                placeholder='edit contactno'
                type="text"
            />
            <input
                {...register('date')}
                placeholder='change date'
                type="date"
            />
        </>
    )
};