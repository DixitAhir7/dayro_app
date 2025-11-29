import { portinstance } from 'axiosinstance/portinstance';
import Loader from 'components/appcom/Loader';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function Enterotp() {

    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: {
        errors,
        isSubmitSuccessful,
        isSubmitting
    } } = useForm();

    const callvefifyotp = async (data) => {
        try {
            const getemail = sessionStorage.getItem('email');
            const verifyotpRes = await portinstance.post('/auth/verifyotp', { useremail: getemail, otp: data });
            if (verifyotpRes.status === 200) {
                sessionStorage.removeItem('email');
                return navigate('/resetpassword');
            };
        } catch (error) {
            if (error.response?.status === 422) {
                setError("otp", {
                    type: "validate",
                    message: "otp is wrong check"
                })
            } else if (error) {
                setError("otp", {
                    type: "custom",
                    message: "otp time expired request another"
                })
            };
        }
    };

    return (
        <div className="flex justify-center">
            <div className="shadow-lg p-6 w-90">
                <form onSubmit={handleSubmit(callvefifyotp)} name='otpform'>
                    <div
                        className='mt-6 flex items-center gap-2 p-1'>
                        <input
                            autoFocus
                            {...register('otp', { required: 'otp required' })}
                            type="number"
                            className="border w-full"
                            placeholder="enter otp"
                            autoComplete='on'
                        />
                    </div>
                    {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}


                    {
                        isSubmitting ? <Loader /> :
                            <button type='submit' enterKeyHint='send' className="mt-3">conform</button>
                    }
                </form>
            </div>
        </div>
    )
};