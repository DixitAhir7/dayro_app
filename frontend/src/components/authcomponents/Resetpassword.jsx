import {portinstance} from 'axiosinstance/portinstance';
import React from 'react'
import { useForm } from 'react-hook-form'

export default function Resetpassword() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const addpassword = async (data) => {
        const resetpasswordRes = await portinstance.post('/auth/resetpassword', { userpassword: data });
        console.log(resetpasswordRes.data);
    };


    // this is after verified otp
    return (
        <div className="flex justify-center">
            <div className="shadow-lg p-6 w-90">
                <form onSubmit={handleSubmit(addpassword)} name='otpform'>
                    <div
                        className='mt-6 flex items-center gap-2 border p-1'>
                        <input
                            {...register('resetpassword', { required: 'password required' })}
                            type="password"
                            className="border-none w-full"
                            placeholder="reset password"
                        />
                    </div>
                    {errors.resetpassword && <p className="text-red-500">{errors.resetpassword.message}</p>}

                    <button type='submit' enterKeyHint='send' className="mt-3">conform</button>
                </form>
            </div>
        </div>
    )
};