import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useArtist } from 'Customhooks/useArtist/Getartistscontext';
import Displaysearched from './Displaysearched';
import Ifnotfound from './Ifnotfound';
import ArtistBlogs from 'components/artistcomponents/blogscomponents/ArtistBlogs';
import { isMounted } from 'utilits/reusableCode/usefulcode';
import { useForm } from 'react-hook-form';
import useinterceptors from 'components/authcomponents/managetokens/useinterceptors';


// this component is to displaying kalakar's information through search
export default function Artists() {

    const { name } = useParams();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const useartisthook = useArtist();
    const navigate = useNavigate();

    // console.log(getid);

    useEffect(() => { useartisthook.getall() }, [])

    const artistdata = useartisthook.sortArtists.find(item => item.name === name);
    const msgRef = useRef(null);

    const thanksMsg = () => {
        if (!toast.isActive(msgRef.current)) {
            msgRef.current = toast("thanks for review");
        }
    };

    const usetoken = useinterceptors();

    const postSuggestion = async (data) => {
        await usetoken.post('/artist/recivesuggestion', data);
    }


    // -1 redirect user to which he/she came from
    const sendtoprevpage = () => {
        navigate(-1)
    };

    // book artist
    const bookartist = () => {
        // console.log(artistdata._id);
        useartisthook.getbookedartist(artistdata._id);
        navigate('/');
    };


    /*
    display all details here of searched artist like price and,
    provide accurate information to user that can help user to book
    */

    return (
        <main>
            {
                artistdata ?
                    <div className='mt-4'>
                        <Displaysearched
                            name={artistdata.name}
                            proffesion={artistdata.proffesion}
                            price={artistdata.price}
                            book={bookartist}
                            img={`http://localhost:9626/${artistdata.artistimg}`}
                        />
                    </div> :
                    <Ifnotfound
                        sendtoprev={sendtoprevpage}
                        register={register}
                        submitsuggestion={handleSubmit(postSuggestion)}
                    />
            }
        </main>
    )
};