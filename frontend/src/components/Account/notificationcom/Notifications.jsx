import React, { useEffect, useEffectEvent, useRef, useState } from 'react';
import Notificationtouser from './Notificationtouser';
import { useSearchParams } from 'react-router-dom';
import Defaultimg from '/icons/user-default image.jpg';
import { useUser } from 'customhooks/Userprovider';
import { useAuth } from 'customhooks/Authprovider';
import Displaybookedformdata from 'components/artistcomponents/sendbookedformtoartistcom/Displaybookedformdata';
import Nocontentmsg from './Nocontentmsg';
import Modal from 'utilits/reusableCode/Modal';
import Declinereasonmodal from 'components/artistcomponents/sendbookedformtoartistcom/Declinereasonmodal';
import useinterceptors from 'components/authcomponents/managetokens/useinterceptors';
import { useIsMobile } from 'utilits/reusableCode/usefulcode';
import Pages from 'smallscreenscom/Pages';
import Btnforartist from './Btnforartist';
import { ChevronsLeftRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';


// parent component of notifications in account
// after artist accepts then send notification here with popup on home page and redirect user to payment for artisst who selected
export default function Notifications() {

    const usetoken = useinterceptors();
    const [reasonModal, setReasonmodal] = useState(false);
    const [_, setVal] = useSearchParams();

    // load notifications data
    const { userData } = useUser();
    const [open, setOpen] = useState(false);
    const isMobile = useIsMobile(768);
    const msgRef = useRef(null);

    const { handleSubmit, register, formState: { errors } } = useForm();

    const openbookedformmodal = (id) => {
        setOpen(open === id ? null : id);
    };

    const sentNotifytoArtist = () => {
        if (!toast.isActive(msgRef.current)) {
            msgRef.current = toast(
                <>
                    <ChevronsLeftRight /> notification sent successfully
                </>
            );
        }
    };

    const closereasonmodal = () => setReasonmodal(false);
    const [isReason, setReason] = useState(null);

    const sendResponse = async (e, id) => {
        const selectedvalue = e;
        // setVal({ selectedvalue: selectedvalue });

        if (selectedvalue === "select") {
            const sendRes = await usetoken.post("artist/sendresponse", { bookformid: id, selectedvalue: e });
            // sentNotifytoArtist();
        } else {
            setReasonmodal(true)
            const sendRes = await usetoken.post("artist/sendresponse", { bookformid: id, reason: isReason, selectedvalue: e });
        }
    };

    // useEffectEvent()

    return (
        <>
            <h1 className="mb-2 max-sm:mt-6 max-sm:text-2xl">Notifications</h1>
            {/* <label>if you are an artist plese ignore payment,cancel occasion</label> */}
            {
                userData.data?.notificationData?.map(n => (
                    <div className='mt-2 w-full bg-white shadow-md md:p-2 md:flex'>
                        {/* means that this notification is for artist show buttos only to that notification*/}
                        <Notificationtouser
                            onlyvtouser={n.notification.startsWith("your dayro got selected")}
                            notify={n.notification}
                            bookformid={n.groupeddata._id}
                        />
                        {
                            n.notification.startsWith("you got request from") &&
                            <>
                                <Btnforartist
                                    setOpendata={() => openbookedformmodal(n.groupeddata._id)}
                                />
                                {
                                    open === n.groupeddata._id &&
                                    <Modal>
                                        <span onClick={() => setOpen(false)}>X</span>
                                        <Displaybookedformdata
                                            occasionName={n.groupeddata.occasionName}
                                            occasionlocation={n.groupeddata.occasionLocation}
                                            phoneno={n.groupeddata.contactNo}
                                            whobooked={n.groupeddata.whosBooking}
                                            occasiondate={n.groupeddata.occasionDate}
                                        />
                                        <form className="mt-4 flex">
                                            <button
                                                type='button'
                                                onClick={(e) => sendResponse(e.target.innerText, n.groupeddata._id)}>
                                                select
                                            </button>
                                            <button
                                                type='button'
                                                onClick={(e) => sendResponse(e.target.innerText, n.groupeddata._id)}
                                                className='ml-2'>
                                                decline
                                            </button>
                                        </form>
                                    </Modal>
                                }
                            </>
                        }
                    </div>
                ))
            }

            {
                reasonModal &&
                <Modal>
                    <Declinereasonmodal
                        close={closereasonmodal}
                        onsubmit={() => sendResponse(n.groupeddata._id)}
                        setReason={(e) => setReason(e.target.value)}
                    />
                </Modal>
            }

            {
                !userData.data?.notificationData.length > 0 && <h1>no notification</h1>
            }

            {/* modal for showing data of bookedform to artists*/}
            {/* {
                userData.data.notificationData.map(n => (
                    isMobile ?
                        <Pages>
                            <Displaybookedformdata
                                imgsrc={Defaultimg}
                                occasionconf={sendResponse}
                                reasonmodal={sendResponse}
                            />
                        </Pages > :
                        <>

                        </>

                ))
            } */}
        </>
    )
};