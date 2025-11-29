import { portinstance } from 'axiosinstance/portinstance';
import { useAuth } from 'customhooks/Authprovider';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// when signin verify otp
export default function Firsttimeotp() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { setUserauth } = useAuth();
    const getemail = localStorage.getItem("semail");

    const verifyotp = async (data) => {
        const verifiedRes = await portinstance.post("auth/verifysotp", { votp: data.votp, email: getemail });
        if (verifiedRes.status === 201) {
            setUserauth(prev => ({
                ...prev,
                role: verifiedRes.data.data.role,
                accesstoken: verifiedRes.data.data.accesstoken
            }));
            navigate(`/${verifiedRes.data.data.user.username}`)
        };
    }

    return (
        <main>

            <form onSubmit={handleSubmit(verifyotp)}>
                <input type="text" placeholder='enter otp'
                    {...register("votp", { required: "otp is required" })}
                />
                <button type="submit">verify</button>
            </form>
        </main>
    )
};