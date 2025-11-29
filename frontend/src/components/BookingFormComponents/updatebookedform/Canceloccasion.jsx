import useinterceptors from 'components/authcomponents/managetokens/useinterceptors';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';

// when user cancel occasion 
export default function Canceloccasion() {

    const usetoken = useinterceptors();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { id } = useParams();

    const cancelDayro = async (data) => {
        const canceleRes = await usetoken.patch(`artist/cancelbooking/${id}`, data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(cancelDayro)} name='canceloccasion'>
                <textarea
                    {...register('cancelReason', { required: "reason is required" })}
                    placeholder='why do you want to cancel occasion'
                    className='max-sm:w-full'
                />

                <button
                    className='block'
                    type="submit"
                >
                    send
                </button>
            </form>
        </>
    )
};