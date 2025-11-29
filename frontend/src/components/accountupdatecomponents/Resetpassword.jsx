import useinterceptors from 'components/authcomponents/managetokens/useinterceptors';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'utilits/reusableCode/Modal';

// when user wants to change password
export default function Resetpassword({
    close
}) {

    const [curpassword, setCurPassword] = useState("");
    const usetoken = useinterceptors();

    const [iscorrect, setCheck] = useState(false);
    const navigate = useNavigate();

    const handlecurps = (e) => {
        const curpsval = e.target.value;
        setCurPassword(curpsval);
    };

    const iscurpsCorrect = async () => {
        const checkpsRes = await usetoken.put('/auth/accountesetpassword', { currentps: curpassword });
        console.log(checkpsRes.data);
        if (checkpsRes.status === 200) {
            setCheck(true)
        }
        const asktonavigate = prompt('password is not correct want to reset?')
        if (asktonavigate == 'yes'.toLowerCase().trim()) {
            return navigate('/forgotpassword');
        };
    };


    return (
        <main>
            <Modal>
                <span onClick={close}>X</span>
                <form onSubmit={iscurpsCorrect}>
                    <input
                        value={curpassword}
                        onChange={handlecurps}
                        className='block border'
                        type="password"
                        placeholder='current password'
                        autoComplete='current-password'
                    />
                    <button className='mt-2' type='submit'>submit</button>
                    <Link className='mt-4' to='/forgotpassword'>forgot password? send otp</Link>
                </form>
            </Modal>


            {/* if current password is correct then open change password model */}
            {
                iscorrect &&
                <Modal>
                    <form name='newpassword'>
                        <input type="password" autoComplete='new-password' className='block' placeholder='new password' />
                        <input type="password" placeholder='reenter password' autoComplete='new-password' />
                        <Link to='/forgotpassword'>forgot password? send otp</Link>
                    </form>
                </Modal>
            }
        </main>
    )
};