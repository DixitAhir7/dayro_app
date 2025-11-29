import React, { useEffect } from 'react';
import Asktocomplete from 'components/askaicom/Asktocomplete';

export default function Inputstotake({
    register,
    errors
}) {
    return (
        <>
            <input
                placeholder='your name'
                type='text'
                {...register('Name', { required: 'Name is required' })}
                autoComplete="name"
                className="max-sm:w-full"
            />

            {errors.Name && <p className="text-red-500">{errors.Name.message}</p>}

            <input
                placeholder="Occasion"
                type="text"
                className="max-sm:w-full mt-3"
                {...register('Occasionname', { required: 'occasion is required' })}
            />
            {errors.Occasionname && <p className="text-red-500">{errors.Occasionname.message}</p>}

            <input
                {...register('contactno', { required: 'contactno is required' })}
                placeholder="phone no"
                type="number"
                autoComplete="tel"
                className="max-sm:w-full mt-3"
            />
            {errors.contactno && <p className="text-red-500">{errors.contactno.message}</p>}

            <input
                className='mt-3 max-sm:w-full'
                type="text"
                placeholder="location for dayro"
                {...register('location', { required: "location is required" })}
            />

            {errors.location && <p className='text-red-400'>{errors.location.message}</p>}

            <input
                {...register('notes', {
                    maxLength: {
                        value: 20,
                        message: "can't send more than 20 words"
                    }
                })}
                type="text"
                placeholder="send notes to artists"
                className='mt-3 max-sm:w-full'
            />

            {errors.notes && <p className="text-red-400">{errors.notes.message}</p>}

            <select className='mt-3' {...register('isPublic')}>
                <option value="public">public</option>
                <option value="private">private</option>
            </select>
        </>
    )
};