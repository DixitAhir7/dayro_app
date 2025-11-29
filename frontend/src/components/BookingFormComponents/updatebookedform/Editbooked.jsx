import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import 'swiper/css/navigation';
import 'swiper/css';
import 'css/Bookartist.css';
import Bookedartistimgs from './Bookedartistimgs';
import Canceledartist from "./Canceledartist";
import { useForm } from "react-hook-form";
import useinterceptors from "components/authcomponents/managetokens/useinterceptors";
import Updatebookedform from "./Updatebookedform";
import Cancelartistreason from "./Cancelartistreason";
import { EllipsisVertical } from "lucide-react";
import Loader from "components/appcom/Loader";
import Modal from "utilits/reusableCode/Modal";
import Canceloccasion from "./Canceloccasion";
import { useArtist } from "customhooks/useArtist/Getartistscontext";

/**
 * @parent component
*/

function Editbooked() {

    const location = useLocation();
    const navigate = useNavigate();

    const { bookformid } = useParams();

    const usetoken = useinterceptors();
    const [getBookeddataid, setBookeddataid] = useState([]);

    // check if id is undefined

    useEffect(() => {
        const checkifundefined = location.pathname.split('/')[2];
        if (typeof checkifundefined === "undefined") {
            navigate(-1);
        };
    }, [bookformid]);

    const { register, handleSubmit, reset, formState: { errors, isSubmitted, isSubmitting } } = useForm({
        defaultValues: {
            Name: "",
            contactno: "",
            occasion: "",
            date: ""
        }
    });

    // bookartistform id through this id i'll get form data of bookedartists


    // display bookedform
    const getBookedformdata = async () => {
        const getData = await usetoken.get(`artist/sendbookform/${bookformid}`);
        setBookeddataid(getData.data.data);
        console.log(getData.data.data)
        reset({
            Name: getData.data.data.Name,
            phoneNo: getData.data.data.contactNo,
            occasionName: getData.data.data.occasionName,
            date: getData.data.data.occasionDate
        })
    };

    useEffect(() => { getBookedformdata() }, [bookformid]);


    const removeArtist = async () => {
        const removeartistRes = await usetoken.patch(`artist/cancelartist/`, {});
        return removeartistRes;
    };

    const Updateform = async (data) => {
        const updateformRes = await usetoken.patch('artist/updatebookform', {
            bookformid: bookformid,
            Name: data.Name,
            date: data.date,
            phoneNo: data.phoneNo,
            occasionname: data.occasionName
        });
        // console.log(updateformRes.data);
    };

    const cancelArtist = (data) => {
        console.log(data);
    };

    const [cancelmodal, setModal] = useState(false);
    const [reason, setReason] = useState("");

    const takereason = (e) => {
        setReason(e.target.value);
    };

    const openmodal = () => {
        setModal(true)
    };

    const closemodal = () => {
        setModal(false)
    };

    const sendtoartist = async () => {
        const reasonRes = await usetoken.post(`artist/cancelbooking/${id}`, { cancelReason: reason });
        return reasonRes;
    };

    const useArtisthook = useArtist();
    const [showMenu, setShowMenu] = useState(false);

    const openEdit = (id) => {
        setShowMenu(showMenu === id ? null : id);
    };

    useEffect(() => {
        const btns = document.querySelectorAll("button");

        btns.forEach(b => {
            b.setAttribute('disable', true)
        });
    }, []);

    return (
        <main>
            {
                getBookeddataid?.map(a => (
                    <>
                        <div className="flex">
                            <Bookedartistimgs removeartist={() => removeArtist}
                                openedit={() => openEdit(a._id)}
                                img={`http://localhost:9626/${a.artistimg}`}
                                imgname={a.name}
                            />
                        </div>
                    </>
                ))
            }

            <form name="updatebookinfo" onSubmit={handleSubmit(Updateform)}>
                <Updatebookedform
                    register={register}
                    isSubmitted={isSubmitted}
                />

                {
                    isSubmitting ?
                        <Loader /> :
                        <button
                            type='submit'
                            enterKeyHint='done'
                            disabled={isSubmitted ? true : false}
                        >
                            edit
                        </button>
                }

                {/* <button>add artists</button> */}

                <button
                    role='dialog'
                    onClick={openmodal}
                    type='button'
                >
                    cancel
                </button>
            </form>

            {
                cancelmodal &&
                <Modal>
                    <span onClick={closemodal}>x</span>
                    <Canceloccasion
                        onchange={takereason}
                        val={reason}
                        submit={sendtoartist}
                    />
                </Modal>
            }


            {/*whoever canceled show images to user and ask for specific reason*/}
            {/* <Canceledartist reciveremovedartist={removeArtist} />

            <Cancelartistreason
                register={register}
                submitreason={handleSubmit(cancelArtist)}
            /> */}
        </main>
    )
};

export default React.memo(Editbooked);