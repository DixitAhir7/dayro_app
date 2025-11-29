import Switch from "react-switch";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import useinterceptors from "components/authcomponents/managetokens/useinterceptors";
import Modal from "utilits/reusableCode/Modal";
import Defaultimg from '/icons/user-default image.jpg';

/**
 * @parent component
*/

export default function Editbeartistform() {

    const usetoken = useinterceptors();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            price: "",
            proffesion: "",
            artistimg: ""
        }
    });
    const [showPrice, setShowprice] = useState(true);

    const [isArtist, setArtist] = useState();
    const [artistImg, setArtistimg] = useState()

    const updateArtistInfo = async (data) => {

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('proffesion', data.proffesion);
        formData.append('artistimg', artistImg);
        // for (const value of formData.values()) {
        //     console.log(value);
        // }

        const editbeartistformRes = await usetoken.patch(`artist/updateartist`, formData);
        return editbeartistformRes;
    };

    const Updateimgopen = () => {
        imgRef.current.click();
    };

    const getArtist = async () => {
        try {
            const getArtist = await usetoken.get('artist/getartist');
            reset({
                name: getArtist.data.data.name,
                proffesion: getArtist.data.data.proffesion,
                price: getArtist.data.data.price,
                artistimg: getArtist.data.data.artistimg
            });
            setArtist(getArtist.data.data.artistimg)
        } catch (error) {
            console.log("error while getting artist", error)
        }
    };

    useEffect(() => {
        getArtist();
    }, []);


    const handleavaliablity = () => {
        setShowprice(prev => !prev)
    }

    const [openModal, setModal] = useState(false);

    const handleopenModal = () => {
        setModal(true)
    };
    const handlecloseModal = () => {
        setModal(true)
    };

    const imgRef = useRef(null);

    const deleteasArtist = async () => {
        await usetoken.delete('/artist/deleteartist');
    }

    return (
        <main>
            <h1>edit artist form </h1>
            <form className="mt-4" onSubmit={handleSubmit(updateArtistInfo)} name="editbeartistform">
                <input
                    {...register('name')}
                    className="block border"
                    type="text"
                    placeholder="edit name"
                />

                <div className="mt-3">
                    <select className="selectStyle" {...register('proffesion')}>
                        <option>Select proffesion</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Singers">Singers</option>
                        <option value="folksingers">folksingers</option>
                        <option value="Santvani">Santvani</option>
                    </select>
                </div>

                <input
                    {...register('price')}
                    className="border mt-3"
                    type="text"
                    placeholder="edit price"
                />

                {/* let artist set price show or not to users */}
                <div className="mt-3">
                    <Switch
                        onChange={handleavaliablity}
                        checked={showPrice}
                        checkedIcon={false}
                        onColor='#FFA500'
                        offHandleColor='#FFA500'
                        uncheckedIcon={false}
                        name="showPrice"
                    />
                </div>

                <input
                    ref={imgRef}
                    hidden
                    type="file"
                    onChange={(e) => setArtistimg(e.target.files[0])}
                />

                <img
                    src={isArtist ? `http://localhost:9626/${isArtist}` : Defaultimg}
                    alt="editimg"
                    className="size-50"
                    onClick={Updateimgopen}
                />

                <button className="mt-5" type="submit">submit</button>
                <button onClick={handleopenModal} className="mt-5 ml-2" type="button">delete</button>

                {
                    openModal &&
                    <Modal>
                        <p>it'll delete all the data and you won't be able to recive it back and users won't be able to book or see you conform?</p>
                        <button onClick={deleteasArtist} type="button">delete</button>
                        <button onClick={handlecloseModal} type="button">cancel</button>
                    </Modal>
                }
            </form>
        </main>
    )
};

// if new artist wants to edit their information