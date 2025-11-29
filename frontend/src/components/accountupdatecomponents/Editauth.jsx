import useinterceptors from 'components/authcomponents/managetokens/useinterceptors';
import { useUser } from 'customhooks/Userprovider';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


// edit auth email,username in account/username/edit
export default function Editauth() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const usetoken = useinterceptors();
    const { userData } = useUser();

    const updatedInfo = async (data) => {
        const updateinfoRes = await usetoken.patch(`/user/${userData.data.user.username}`, {
            useremail: data.useremail,
            username: data.username
        });
        console.log(updateinfoRes.data);
    };


    // maake this in modal
    return (
        <form enterKeyHint='send' onSubmit={handleSubmit(updatedInfo)} className="p-3 w-fit text-black">
            <input
                placeholder='edit email'
                type="email"
                className='w-full border'
                {...register("useremail")}
            />

            <input
                placeholder='edit username'
                className='w-full p-1 border mt-2'
                type="text"
                {...register("username")}
            />

            <div className="mt-6">
                <button type='submit'>update</button>
                <button type='button' className='ml-2'>cancel</button>
            </div>
        </form>
    )
};