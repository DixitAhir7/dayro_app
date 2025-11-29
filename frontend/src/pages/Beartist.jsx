import React, { useState } from 'react';
import Defaultimg from '/icons/user-default image.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import Formbeartist from '../components/beartistcomponents/Formbeartist';
import { useForm } from 'react-hook-form';
import useinterceptors from 'components/authcomponents/managetokens/useinterceptors';
import { useUser } from 'customhooks/Userprovider';

/*
whoever has to be an artist they would have to,
send videos to me then i'll reach out to teams and,
they'll analyze it: conformation
*/

export default function Beartist() {

    const navigate = useNavigate();

    const [artistimg, setImage] = useState();
    const [imgtoSend, setSendimg] = useState();
    const [isOn, setOn] = useState(false);
    const { userData } = useUser();

    const handlechangeimg = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]))
        setSendimg(e.target.files[0])
    };

    const usetoken = useinterceptors();

    const {
        handleSubmit,
        setError,
        register,
        watch,
        formState: {
            errors,
            isSubmitSuccessful,
            isSubmitting,
            submitCount,
            isSubmitted
        }
    } = useForm();

    const watchval = watch("Name");
    // console.log(watchval)

    const [selectedVideo, setSelectedVideo] = useState(null);

    const insertVideo = (event) => {
        console.log(event.target.files)
        setSelectedVideo(event.target.files);
    };

    const onNewartist = async (data) => {
        console.log("submit be artist api called")
        try {
            const formData = new FormData();
            formData.append("Name", data.Name);
            formData.append("email", data.email);
            formData.append("proffesion", data.proffesion);
            formData.append("price", data.price);
            formData.append("phoneNo", data.phoneNo);
            formData.append("isPricePrivate", isOn);
            formData.append('artistimg', imgtoSend);
            formData.append('artvideos', selectedVideo);


            const sendRes = await usetoken.post('/artist/beartist', formData);
            
            if (sendRes.status === 201) {
                navigate(`${userData.data?.user.username}/visibletoartist`);
            }
            // navigatetoLinkedaccout(sendRes.data.data._id);
        } catch (error) {
            console.log("error:", error);
            if (error.response?.status === 409) {
                setError("Name", {
                    type: "custom",
                    message: error.response.data.message
                });
            };
            if (error.response?.status === 406) {
                alert(error.response.data.message)
            };
        }
    };

    // redirect artist to creating linked account
    const navigatetoLinkedaccout = (id) => {
        isSubmitted ? navigate(`/createlinkedaccount/${id}`) : null
    }

    return (
        <main>
            {/* <Displaymodaltoartist /> */}

            <form name='beartistform'
                onSubmit={handleSubmit(onNewartist)}
                className='space-y-4 max-sm:space-y-2.5 max-sm:m-2'>
                <Formbeartist
                    register={register}
                    imageChange={handlechangeimg}
                    errors={errors}
                    setShowprice={() => setOn(prev => !prev)}
                    showPrice={isOn}
                    imgSrc={artistimg ? artistimg : Defaultimg}
                    onVideoc={insertVideo}
                />
            </form>
        </main>
    )
};