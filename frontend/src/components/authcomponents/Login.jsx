import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { portinstance } from 'axiosinstance/portinstance';
import { useAuth } from 'Customhooks/Authprovider';
import useToken from './managetokens/useToken';
import { KeyRound, Mail } from 'lucide-react';
import Loader from 'components/appcom/Loader';
const storeDb = indexedDB.open('tokens', 1);


export default function Login() {

    const { register, handleSubmit, setError, formState: { errors, submitCount, isSubmitting } } = useForm();
    const { setUserauth } = useAuth();
    // const refresh = useToken();
    const navigate = useNavigate();


    const onSubmit = async (data) => {
        try {
            const loginRes = await portinstance.post('/auth/login', data);
            setUserauth(loginRes.data.data);
            localStorage.setItem('isAuthenticated', true);

            // storeDb.onerror = (e) => {
            //     console.error("error while opening token storage", e);
            // }

            // storeDb.onsuccess = (e) => {

            //     let db = e.target.result;

            //     const transactions = db.transaction('tokens', "readwrite");
            //     let storeData = transactions.objectStore('tokens');

            //     let request = storeData.put({
            //         acesstoken: loginRes.data.data.accesstoken,
            //         time: Date.now().toFixed(2)
            //     });

            //     request.onerror = (e) => console.log(e.target.error);
            //     request.onsuccess = (e) => console.log(e.target.result);

            //     console.log('succesfully opened database');
            // };

            // storeDb.onupgradeneeded = (e) => {
            //     let db = event.target.result;

            //     if (!db.objectStoreNames.contains("tokens")) {
            //         const createObj = db.createObjectStore('tokens', { keyPath: 'tokens' });
            //         createObj.createIndex('tokens', 'tokens', { unique: false });
            //     }
            // }

            if (loginRes.status === 200) {
                navigate(`/${loginRes.data.data.username}/bookedartists`)
            };
        } catch (err) {
            if (err.response.data.status === 404) {
                setError("custom", {
                    type: "custom",
                    message: err.response.data.message
                });
            }
            console.log(err)
        }
    };


    return (
        <>
            <div className="flex justify-center">
                <div className="p-6 shadow-lg">
                    <h1>login</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div
                            className='mt-6 flex items-center gap-2 border p-1'>
                            <Mail />
                            <input
                                {...register('identifier', { required: 'email or username required' })}
                                type="text"
                                className="border-none w-full"
                                placeholder="email or username"
                                autoFocus
                                autoComplete='username'
                            />
                        </div>

                        {errors.identifier && <p className="text-red-500">{errors.identifier.message}</p>}
                        <div
                            className='mt-6 flex items-center gap-2 border p-1'>
                            <KeyRound />
                            <input
                                {...register('userpassword', { required: "password is required" })}
                                type="password"
                                className="border-none w-full"
                                placeholder="password"
                                autoComplete='current-password'
                            />
                        </div>

                        {errors.userpassword && <p className="text-red-500">{errors.userpassword.message}</p>}

                        {
                            isSubmitting ? <Loader /> :
                                <button type='submit' className='mt-5 w-fit'>login</button>
                        }
                        <Link to="/forgotpassword" className="text-xl mt-4.5">forgot password?</Link>
                    </form>
                    <Link to='/signin' className='mt-4 w-fit text-xl'>don't have an account? signin</Link>
                    {/* <button onClick={() => refresh()}>gettoken</button> */}
                </div>
            </div>
        </>
    )
};