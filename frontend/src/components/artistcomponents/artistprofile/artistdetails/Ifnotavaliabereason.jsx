import React, { useState } from 'react';
import Afterreason from '../Reciverequest';
import { Forward } from 'lucide-react';

export default function Ifnotavaliabereason({ sendBool, register, errors }) {
    return (
        <>
            <textarea
                {...register('reason', {
                    required: "reason is required", maxLength: {
                        value: 20,
                        message: "Maximum 35 characters allowed",
                    }
                })}
                className='max-sm:w-full h-full content-stretch'
                placeholder='please give reason'
            />

            {errors.reason && <p className='text-red-400'>{errors.reason.message}</p>}
        </>
    )
};