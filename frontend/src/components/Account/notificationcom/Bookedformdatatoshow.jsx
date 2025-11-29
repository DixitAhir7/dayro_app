import Displaybookedformdata from 'components/artistcomponents/sendbookedformtoartistcom/Displaybookedformdata';
import { useUser } from 'customhooks/Userprovider';
import React, { useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Defaultimg from '/icons/user-default image.jpg';
import useinterceptors from 'components/authcomponents/managetokens/useinterceptors';
import { ChevronsLeftRight } from 'lucide-react';
import Modal from 'utilits/reusableCode/Modal';
import Declinereasonmodal from 'components/artistcomponents/sendbookedformtoartistcom/Declinereasonmodal';
import { useForm } from 'react-hook-form';

/**
 * when artits clicks open redirect him/her to this page and show data and send select/decline from this 
*/

export default function Bookedformdatatoshow() {

    const { id } = useParams();
    const { userData } = useUser();
    const usetoken = useinterceptors();
    const msgRef = useRef(null);

    const [reasonModal, setReasonmodal] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();


    // if artist cancel request,open reason modal
    const closereasonmodal = () => setReasonmodal(false);

    // get id from bookedform of user

    //to send notification to user
    const [_, setVal] = useSearchParams();

    const bookedformData = userData.data.notificationData.find(n => n.groupeddata._id === id)

    // console.log(bookedformData)

    const sentNotifytoArtist = () => {
        if (!toast.isActive(msgRef.current)) {
            msgRef.current = toast(
                <>
                    <ChevronsLeftRight /> notification sent successfully
                </>
            );
        }
    };

    const sendResponse = async (data) => {
        const getSelectedval = e.target.innerText;
        setVal({ selectedvalue: getSelectedval });

        if (getSelectedval === "select") {
            // console.log("select value")
            const sendRes = await usetoken.post("artist/sendresponse", { bookformid: id });
            sentNotifytoArtist();
        } else {
            setReasonmodal(true)
            const sendRes = await usetoken.post("artist/sendresponse", { bookformid: id, reason: data.reason });
        }
    };

    return (
        <main>
            {
                <>
                    <div className="flex items-center">
                        <img
                            src='/public/icons/user-default image.jpg'
                            alt='username'
                            className="w-10 h-10"
                        />
                        <h2 className="font-semibold text-lg ml-2">user wants to invite you to celebrate together</h2>
                    </div>
                    <Displaybookedformdata
                        imgsrc={Defaultimg}
                        phoneno={bookedformData.groupeddata.contactNo}
                        whobooked={bookedformData.groupeddata.whosBooking}
                        occasionName={bookedformData.groupeddata.occasionName}
                        occasiondate={bookedformData.groupeddata.occasionDate}
                        occasionlocation={bookedformData.groupeddata.occasionlocation}
                    />
                    <form className="mt-4 flex">
                        <button
                            type='button'
                            onClick={sendResponse}>
                            select
                        </button>
                        <button
                            type='button'
                            onClick={sendResponse}
                            className='ml-2'>
                            decline
                        </button>
                    </form>
                </>
            }
            {/* send notification to user that it got decline by artist*/}
            {
                reasonModal &&
                <Modal>
                    <Declinereasonmodal
                        close={closereasonmodal}
                        onsubmit={handleSubmit(sendResponse)}
                        register={register}
                    />
                </Modal>
            }
        </main>
    )
};