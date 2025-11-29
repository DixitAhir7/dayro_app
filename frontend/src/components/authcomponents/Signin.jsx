import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { portinstance } from 'axiosinstance/portinstance';
import { Eye, KeyRound, Mail, User } from 'lucide-react';
import Loader from 'components/appcom/Loader';


function Signin() {

    const divStyle = {
        inputDiv: {
            border: 1,
            borderStyle: "solid",
            borderWidth: 1,
            marginTop: 22,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: 4
        },
        inputStyle: {
            border: 0,
            borderStyle: "none",
            width: "100%"
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, watch, setError, formState: {
        errors, submitCount, isSubmitting, isSubmitSuccessful, isSubmitted
    } } = useForm();


    // emailvalidation: when user submit send otp to entered email if email exsist then ok otherwise don't signin
    const onAuthsubmit = async (data) => {
        localStorage.setItem('semail', data.useremail)
        try {
            const signinRes = await portinstance.post('/auth/signin', data);
            return signinRes;
        } catch (error) {
            if (error.response?.status === 409) {
                setError("username", {
                    type: "custom",
                    message: "username is taken or user exists"
                });
            };
            if (error.response?.status === 406) {
                setError("username", {
                    type: "custom",
                    message: "username is not valid",
                });
            };
            console.log("error:", error.response.data);
        };
    };

    return (
        <>
            <div className="flex justify-center">
                <form className='p-4 shadow-lg' onSubmit={handleSubmit(onAuthsubmit)}>
                    <h1 className='m-3'>Signin</h1>
                    <div style={divStyle.inputDiv}>
                        <Mail />
                        <input
                            {...register('useremail', { required: "email is required" })}
                            type="email"
                            placeholder="Enter email"
                            autoComplete='email'
                            style={divStyle.inputStyle}
                        />
                    </div>

                    {errors.useremail && <p className='text-red-400'>{errors.useremail.message}</p>}

                    {errors.root && <p>{errors.root.message}</p>}

                    <div style={divStyle.inputDiv}>
                        <KeyRound />
                        <input
                            {...register('userpassword', { required: "password is required" })}
                            type={showPassword ? 'text' : 'password'}
                            style={divStyle.inputStyle} placeholder="Enter password"
                            autoComplete='new-password'
                        />
                        <Eye className='cursor-pointer mr-2' onClick={() => setShowPassword(prev => !prev)} />
                    </div>

                    {errors.userpassword && <p className='text-red-400'>{errors.userpassword.message}</p>}

                    <div style={divStyle.inputDiv}>
                        <User />
                        <input
                            {...register('username', { required: "username is required" })}
                            type='text'
                            style={divStyle.inputStyle} placeholder="Enter username"
                            autoComplete='username'
                        />
                    </div>

                    {errors.username && <p className='text-red-400'>{errors.username.message}</p>}

                    <Link to="/verifyotp">enter otp</Link>

                    {
                        isSubmitting ?
                            <Loader /> :
                            <button className='mt-5' type='submit'>signin</button>
                    }

                    <Link className="text-xl mt-5" to='/login'>have an account? login</Link>
                </form>
            </div>
        </>
    )
};

export default React.memo(Signin);

{/* <div
    className='flex border items-center gap-2 p-1 mt-5 '>
    <input
        onChange={handleChange}
        value={signinauth.dob}
        name='dob'
        type='date'
        className="border-none w-full"
        placeholder="Enter birthdate" />
</div>  */}