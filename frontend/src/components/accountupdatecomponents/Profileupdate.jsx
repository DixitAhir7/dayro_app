import React, { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Defaultimg from '/icons/user-default image.jpg'
import Input from 'utilits/reusableCode/Input';
import { useForm } from 'react-hook-form';
import Modal from 'utilits/reusableCode/Modal';
import AccResetpassword from './Resetpassword';
import Editimgmodal from './Editimgmodal';
import Userimageupdate from 'components/accountupdatecomponents/Userimageupdate';
import useinterceptors from 'components/authcomponents/managetokens/useinterceptors';
import Deleteaccount from './Deleteaccount';
import { useUser } from 'customhooks/Userprovider';


/**
 * @parent
 *update Email,Ps,username,
  image, and handle logout and delete account 
 */

export default function Profileupdate() {

    const [enabled, setEnabled] = useState(true);
    const [isopen, setOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState(null);
    const [deleteaccModal, setDeleteaccmodal] = useState(false);
    const [openinputModal, setInputmodal] = useState(false);
    const usetoken = useinterceptors();
    const { userData } = useUser();
    const [editimg, setImgedit] = useState(false);
    const [isimg, setImg] = useState("");
    const imgref = useRef();
    const [preview, setPreview] = useState(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            userimg: "",
        }
    });

    const [isUser, setUser] = useState();

    async function getUser() {
        const getuserdata = await usetoken.get(`user/${userData.data.username}`);
        setUser(getuserdata.data.data.userimg)
        // reset({
        //     userimg: userData.data.user.userimg
        // })
    }

    useEffect(() => {
        getUser();
    }, [])

    const onimageadd = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImg(file);
            // console.log("image changed")
            setPreview(URL.createObjectURL(file))
        };
    };


    const updateprofilepic = async () => {
        const formdata = new FormData();
        formdata.append("userimg", isimg);

        await usetoken.put(`/user/imgupload`, formdata,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
    }

    const Updateimgopen = () => {
        imgref.current.click();
    };

    const handleTimeChange = (newValue) => {
        setSelectedTime(newValue);
        console.log('Selected time:', newValue?.format('HH:mm'));
    };


    const Deleteaccmodal = () => setDeleteaccmodal(true);
    const closeModal = () => setDeleteaccmodal(false);

    const deleteAccount = async (data) => {
        console.log(data)
        const deletedAccount = await usetoken.delete('/auth/deleteaccount', data.userpassword);
        console.log(deletedAccount);
    };

    const conformmodal = () => {
        setInputmodal(false);
        setDeleteaccmodal(false);
    };

    const navigate = useNavigate();

    const logout = async () => {
        const logoutRes = await usetoken.post('/auth/logout');
        if (logoutRes.status === 200) {
            localStorage.clear()
            localStorage.setItem('isAuthenticated', false);
            navigate('/')
        }
    };

    return (
        <main>
            {/*open image update model*/}
            <Userimageupdate
                imgref={imgref}
                editModal={() => setImgedit(true)}
                changeimg={onimageadd}
                imgSrc={isUser ? isUser : Defaultimg}
            />

            {/* image edit in modal */}
            {
                editimg && (
                    <Editimgmodal
                        close={() => setImgedit(false)}
                        imgSrc={preview ? preview : Defaultimg}
                        openFiles={Updateimgopen}
                        update={updateprofilepic}
                    />
                )
            }

            <div className="mt-4">
                <Link className='text-xl underline' to='edit'>edit auth</Link>
            </div>

            <div className="flex">
                <button onClick={() => setOpen(true)}>edit password</button>
                <button type="button" onClick={logout} className='ml-3'>logout</button>
                <button onClick={Deleteaccmodal} type="button" role='dialog' className='h-fit ml-3'>delete account</button>
            </div>
            {/* reset password */}
            {isopen && <AccResetpassword close={() => setOpen(false)} />}

            {/* delete account modal */}
            {
                deleteaccModal &&
                <Modal>
                    <Deleteaccount
                        openModal={() => setInputmodal(true)}
                        closeModal={closeModal}
                    />
                </Modal>
            }

            {/* delete account modal inputs*/}
            {
                openinputModal &&
                <Modal>
                    <form
                        name='deleteaccform'
                        onSubmit={handleSubmit(deleteAccount)}
                        className='w-fit'>
                        <Input
                            obj={{ ...register('userpassword', { required: "password is required" }) }}
                            type="password"
                            className='block'
                            placeholder='enter password'
                            name='userpassword'
                            autoComplete="current-password"
                        />

                        <button enterKeyHint='send' type='submit'>delete</button>
                        <button onClick={conformmodal} type='button'>cancel</button>
                    </form>
                </Modal>
            }
            <Outlet />
        </main >
    )
};


{/* for sending notifications:festivals and fasts */ }