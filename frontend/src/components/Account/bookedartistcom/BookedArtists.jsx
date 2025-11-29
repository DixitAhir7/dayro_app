import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useUser } from 'Customhooks/Userprovider';
import Ifnotbookedany from 'components/Account/bookedartistcom/Ifnotbookedany';
import Modal from 'utilits/reusableCode/Modal';
import { useIsMobile } from 'utilits/reusableCode/usefulcode';
import Displaybookedformdata from 'components/artistcomponents/sendbookedformtoartistcom/Displaybookedformdata';
import useinterceptors from 'components/authcomponents/managetokens/useinterceptors';
import { Bounce, toast, ToastContainer } from 'react-toastify';


// display booked artists to user after they completed process payment too
function BookedArtists() {

    const [isopen, setOpen] = useState(false);
    const { userData } = useUser();
    const isMobile = useIsMobile();

    const usetoken = useinterceptors();

    const navigate = useNavigate();

    const openmodal = (id) => {
        setOpen(isopen === id ? null : id);
    };

    const location = useLocation();

    // console.log(location.pathname)

    useEffect(() => {
        if (location.pathname === "/bookedartistsdata/:id" && !isMobile) {
            navigate(-1)
        }
    }, [])

    const closemodal = () => {
        setOpen(false)
    };

    const msgRef = useRef(null);

    // if jobs failed then let user contact me or send automatic email that consist information about bookformid
    const sendrefundEmail = async (id) => {
        const emailRes = await usetoken.post("artist/reqrefund", id);
        if (emailRes.status === 200) {
            if (!toast.isActive(msgRef.current)) {
                msgRef.current = toast("email sent sucefully you'll get refund asap");
            }
        }
    }

    return (
        <>
            <div>
                {/* {
                    isMobile ?
                        <>
                            <Link><Displaybookedformdata /></Link>
                        </>
                        : <>
                            <button onClick={openmodal}>open</button>
                            {isopen && <Modal>
                                <p>hey you are in rick's simulation you can't get out anymore sorry dude</p>
                            </Modal>}
                        </>
                } */}
            </div>

            {/* redirect to edit and take bookformid somehow*/}

            <div className="occasionbookedinfoprev">
                {userData.data?.artistData.length > 0 ?
                    <>
                        {
                            userData.data.artistData?.map(o => (
                                <div key={o._id}>
                                    <div className="flex">
                                        <cite
                                            className='text-2xl w-fit cursor-pointer'
                                            onClick={() => openmodal(o._id)}
                                        >
                                            Occasion: {o.Name}
                                        </cite>
                                        <span
                                            onClick={() => sendrefundEmail(o._id)}
                                            className='mt-1.5 ml-2'>
                                            didn't get refund? request refund
                                        </span>
                                    </div>
                                    {
                                        isopen === o._id &&
                                        <Modal>
                                            <span onClick={closemodal}>X</span>
                                            <Displaybookedformdata
                                                occasiondate={o.occasionDate}
                                                occasionName={o.occasionName}
                                            />
                                            <div className="editbooked mt-4 flex">
                                                {/* display remaing time to user to change location,occasion even artist */}
                                                <Link
                                                    to={`/editbooked/${o._id}`}
                                                    className='ml-4'
                                                    type='button'>
                                                    edit booking
                                                </Link>
                                            </div>
                                        </Modal>
                                    }
                                </div>
                            ))
                        }
                    </> :
                    <div className='mt-4 max-sm:m-3 max-sm:mt-6'>
                        <Ifnotbookedany />
                    </div>
                }

                <ToastContainer
                    position='top-center'
                    draggable="mouse"
                    role='alert'
                    pauseOnHover={true}
                    transition={Bounce}
                />
            </div>
            {/* <div className="occasionbookedinfoprev">
                {userData.data?.bookedartist.length > 0 ?
                    <>
                        {
                            userData.data.bookedartist?.map(o => (
                                <div key={o._id}>
                                    {
                                        isMobile ? <Link to={`/bookedartistsdata/${o._id}`}>{o.Name}</Link> :
                                            <cite
                                                className='text-2xl w-fit cursor-pointer'
                                                onClick={() => openmodal(o._id)}
                                            >
                                                Occasion: {o.Name}
                                            </cite>
                                    }
                                    {
                                        !isMobile ?
                                            isopen === o._id &&
                                            <Modal>
                                                <span onClick={closemodal}>X</span>
                                                <Displaybookedformdata
                                                    occasiondate={o.occasionDate}
                                                    occasionName={o.occasionName}
                                                />
                                                <div className="editbooked mt-4 flex">
                                                    display remaing time to user to change location,occasion even artist
                                                    <Link
                                                        to={`/editbooked/${o._id}`}
                                                        className='ml-4'
                                                        type='button'>
                                                        edit booking
                                                    </Link>
                                                </div>
                                            </Modal> : ""
                                    }
                                </div>
                            ))
                        }
                    </>
                    :
                    <div className='mt-4 max-sm:m-3 max-sm:mt-6'>
                        <Ifnotbookedany />
                    </div>
                }
            </div> */}
        </>
    )
};

export default React.memo(BookedArtists);