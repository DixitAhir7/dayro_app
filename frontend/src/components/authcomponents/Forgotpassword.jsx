import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { portinstance } from 'axiosinstance/portinstance';
import Loader from 'components/appcom/Loader';

export default function Forgotpassword() {

    const navigate = useNavigate();

    const { register, handleSubmit, setError, formState: {
        errors,
        submitCount,
        isSubmitting,
        isSubmitSuccessful
    } } = useForm();    


    const getotp = async (data) => {
        try {
            const emailverifyRes = await portinstance.post('/auth/sendotp', data);
            sessionStorage.setItem('email', JSON.stringify(data.email));
            if (isSubmitSuccessful && emailverifyRes.data.data.ok) {
                return navigate('/enterotp')
            }
        } catch (error) {
            if (error.response?.status === 409) {
                setError("email", {
                    type: "custom",
                    message: "no user, sign in"
                })
            };
        }
    };

    return (
        <div className="flex justify-center">
            <div className="shadow-lg p-6 w-90">
                <form name='forgotpsform' onSubmit={handleSubmit(getotp)}>
                    <div
                        className='mt-6 flex items-center gap-2 border p-1'>
                        <input
                            autoFocus
                            {...register('email', { required: 'email required' })}
                            type="text"
                            className="border-none w-full"
                            placeholder="enter email"
                            autoComplete='on'
                        />
                    </div>

                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    {
                        isSubmitting ?
                            <Loader /> :
                            <button
                                type='submit'
                                enterKeyHint='send'
                                className="mt-3">
                                send otp
                            </button>
                    }

                    <span className='mt-4'>didn't get the otp? send again</span>
                    <Link className='mt-1' to='/signin'>create new account?</Link>
                </form>
            </div>
        </div>
    )
};