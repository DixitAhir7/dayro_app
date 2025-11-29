import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { data, useNavigate, useSearchParams } from 'react-router-dom';
import { displayartists } from 'apis/artistsapis/displayartistdetails';
import { useAuth } from 'Customhooks/Authprovider';
import useinterceptors from 'components/authcomponents/managetokens/useinterceptors';

const Getartistcontexts = createContext('');


// all getartists apis to display artists
export function Getartistcontext({ children }) {

    // const idk = useFetch("artist/getartists");

    const { authdata } = useAuth();
    const usetoken = useinterceptors();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams('Kalakaro');
    const [priceparams, setPriceparams] = useSearchParams('');

    const proffesion = searchParams.get("proffesion");
    const min = searchParams.get("min");
    const max = searchParams.get("max");


    const [sortArtists, setSortArtists] = useState([]);
    const [message, setMessage] = useState("");


    // sort artists based on proffesion
    const sortonProffesion = async (e) => {
        const value = e.target.value;
        setSearchParams({ proffesion: value });
        const getartistdata = await displayartists(value);
        // if (getartistdata.status === 204) {
        //     setMessage("the catogory you searched for does not exists");
        // };
        setSortArtists(getartistdata.data.data);
    };


    // sort artists based on price
    const onpricechange = async (e) => {
        const value = e.target.value;
        setPriceparams({ min: value, max: value });
    };

    const [isfile, setFile] = useState();

    // this api is for getting all artists
    const getall = useCallback(async () => {
        const getallartists = await usetoken.get('/artist/getartists');
        // if (!getallartists.data.data._id) {
        //     setFile(getallartists.data.data);}
        if (getallartists.data.data.length > 0) {
            localStorage.setItem('length', 1);
        }
        setSortArtists(getallartists.data.data);
    }, []);

    // works for both filters 🎉
    // dispaly data of sorted artists
    const SortedArtists = useMemo(() => {
        if (!proffesion || !min || !max) return sortArtists;

        return sortArtists.filter((artists) =>
            artists.proffesion === proffesion
            // || artists.price === min || max
            || artists.proffesion === "Kalakaro");
    }, [sortArtists]);


    // when image clicked it should display for booking
    const [isSelectedKalakar, setIsselctedKalakar] = useState([]);


    // for displaying in selectedartist sideabr by functioncall
    const [isBooked, setIsbooked] = useState(() => {
        true
        // isSelectedKalakar.length >= 0 ? true : false
    });

    const handleBooked = () => setIsbooked(!isBooked);


    const getBookedArtists = async () => {
        const getBookedRes = await usetoken.get('artist/getbookedartists')
        console.log(getBookedRes.data.data)
        setIsselctedKalakar(getBookedRes.data.data.bookedArtist);
        localStorage.setItem('selectedartistdata', JSON.stringify(getBookedRes.data.data));
    };

    //function to book artist in home page take id of selected artist and update usermodel
    const addBookedartist = async (id) => {
        try {
            const getbookedartistsRes = await usetoken.patch(`/artist/bookartist`, { artistid: id });
            console.log(getbookedartistsRes.data);
            if (getbookedartistsRes.status === 209) {
                return alert(getbookedartistsRes.data.message)
            };

            localStorage.setItem('bookeddates', JSON.stringify(getbookedartistsRes.data.data));
            getBookedArtists();
            // store data of selected artists for info
            // handleBooked();
        } catch (error) {
            if (!authdata.accesstoken) {
                return navigate('redirecttoauth');
            };
            console.log(`got an error while getting booked artist`, error)
        }
    };

    const removeartist = async (id) => {
        const removedartist = await usetoken.patch(`/artist/removeartist`, { artistid: id });
        if (removedartist.status === 200) {
            // 🧞‍♀️
            getBookedArtists()
        }
    };

    const returnvalues = {
        onpricechange,
        getall,
        getBookedArtists,
        removeartist,
        addBookedartist,
        sortonProffesion,
        handleBooked,
        sortArtists,
        message,
        SortedArtists,
        proffesion,
        isBooked,
        isSelectedKalakar,
        isfile
    };

    return (
        <Getartistcontexts.Provider value={returnvalues}>
            {children}
        </Getartistcontexts.Provider>
    )
};

export const useArtist = () => useContext(Getartistcontexts);