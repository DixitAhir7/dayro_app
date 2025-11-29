import React, { useEffect, useRef, useState } from "react";
import Locationapi from "utilits/googleapis/Locationapi";
import { useForm } from "react-hook-form";
import Displaybookedartistdates from "./Displaybookedartistdates";
import useInfo from "Customhooks/bookartistforminfo";
import { useNavigate, useSearchParams } from "react-router";
import Modal from "utilits/reusableCode/Modal";
import Loader from "components/appcom/Loader";
import { useArtist } from "customhooks/useArtist/Getartistscontext";
import Selectwho from "./Selectwho";
import Inputstotake from "./Inputstotake";
import { DayPicker } from "react-day-picker";
import { formatDistance } from "date-fns";
import { gu } from "date-fns/locale";
import useinterceptors from "components/authcomponents/managetokens/useinterceptors";


// user's form for booked artist to conform
function BookArtistsForm() {
    const [isbookedmodal, setBookedmodal] = useState(false);
    const [location, setLocation] = useState();
    const [bookeddate, setBookeddate] = useState();
    const { bookingInfoobj, setBookingFormInfo } = useInfo();
    const [istime, setTime] = useState(new Date());
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();
    const [getSelected, setSelected] = useState([]);
    const [isBooked, setBookeddates] = useState();
    const [markerPosition, setMarkerPosition] = useState(null);
    const [center, setCenter] = useState({
        // default mangrol
        lat: 21.121735,
        lng: 70.116203
    });
    const usetoken = useinterceptors();

    // console.log(Array.isArray(getSelected));

    // test
    const additionalDates = "2025-11-21";

    const bookeddatsOfArtists = JSON.parse(localStorage.getItem('bookeddates'));

    //🧞‍♀️get price and dates
    // const handledatesdata = async () => {
    //     const dateRes = await portinstance.get('artist/bookeddata');
    //     return dateRes;
    // };

    /**
     * @protected
     * disable booked dates for selected artists
     * for now just warn user
     **/

   const iso= new Date().toISOString()
 console.log(iso)
    const onSelectdate = (select) => {
        console.log(select)
        setBookeddate(select);
    };

    // useEffect(() => {
    //     bookeddatsOfArtists.map(d => {
    //         setBookeddates(d.occasionDate)
    //     })
    // }, [])

    const dates = {
        date: new Date("2025-11-29")
    }

    const libraries = ['places'];

    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const asktoConform = (location) => {
        const getOcasionLocation = prompt(`${location} conformed?(yes/no)`);
        if (getOcasionLocation === "yes".toLowerCase().trim()) {
            setLocation(location)
        };
        return getOcasionLocation;
    };

    const searchBoxRef = useRef(null);
    const inputRef = useRef(null);

    const onPlacesChanged = () => {
        const places = searchBoxRef.current.getPlaces();
        const place = places[0];
        asktoConform(place.formatted_address)

        /*
        i can do one thing : when searched i could ask to conform location
     
        it creates 2 scenario: user maybe just searching for fun
        : could be testing like other devs
        */

        if (place && place.geometry) {
            const location = place.geometry.location;
            const newCenter = {
                lat: location.lat(),
                lng: location.lng(),
            };
            setCenter(newCenter);
            setMarkerPosition(newCenter);
        }
    };

    // total price of selecteda artist

    // split with , as per price

    const opendates = () => {
        setBookedmodal(true)
    };

    const closedates = () => {
        setBookedmodal(false)
    };

    const handleBookingInfo = async (data) => {
        const asktoConform = prompt("you won't be able to cancel after 8 hours remaining of dayro occasion");
        try {
            if (asktoConform === "ok".toLowerCase()) {
                const bookedbyuserRes = await usetoken.post('artist/bookartistsform', {
                    Name: data.Name,
                    contactno: data.contactno,
                    whosbooking: data.whosbooking,
                    location: data.location,
                    date: bookeddate,
                    Occasionname: data.Occasionname,
                    time: istime
                });
                setBookingFormInfo(bookedbyuserRes.data.data);
            }
            /* after artist accepts redirect to payment*/
        } catch (err) {
            console.log(err)
        }
    };


    /*
    i've to show to user that artists you've selected are booked for this dates,
    so you can choose another date except for that
    */

    return (
        <main>
            <form id="bookingForm" onSubmit={handleSubmit(handleBookingInfo)}>
                <h1 className="text-center">Booking Form</h1>

                {/* <span role="dialog" onClick={opendates} className="mt-4 text-2xl ml-4">artists you've selected are booked for this dates</span> */}

                {/* {isbookedmodal &&
                        <Modal>
                            <Displaybookedartistdates close={closedates} />
                        </Modal>
                    } */}

                <div className="md:flex">
                    <div className="md:flex-1/2">
                        <Inputstotake
                            register={register}
                            errors={errors}
                        />
                        <Selectwho register={register} />
                        {errors.whosbooking && <p className="text-red-500">{errors.whosbooking.message}</p>}
                    </div>
                    <div id="time" className="md:flex-1/2 max-sm:mt-4 max-sm:ml-3">
                        <DayPicker
                            mode="single"
                            disabled={[
                                { before: new Date() },
                                dates.date,
                                isBooked
                            ]}
                            onSelect={onSelectdate}
                            selected={bookeddate}
                            required
                            animate
                            className="md:ml-3 select-none"
                        />

                        <input value={bookeddate} type="date" name="" id="" onChange={(e) => onSelectdate(e.target.value)} />

                        <input
                            onChange={(e) => setTime(e.target.value)}
                            value={istime}
                            className="md:ml-3 max-sm:mt-2"
                            type="time"
                            name="time"
                        />
                    </div>
                    {/* {
                        getSelected.map(p => (
                            <h1 className="ml-7">price will be {p.price}</h1>
                        ))
                    } */}
                </div>

                {/* prompt suggestion direclty when redirected  */}
                {/* <Link className="text-2xl mt-3 ml-4 w-fit" to="/askai" >don't know how to set up?ask Ai</Link> */}

                {/* <Locationapi
                        searchBoxRef={searchBoxRef}
                        marker={markerPosition}
                        center={center}
                        containerStyle={containerStyle}
                        inputref={inputRef}
                        placeselect={onPlacesChanged}
                        libraries={[libraries]}
                    /> */}

                <div className="md:mt-12 flex">
                    {/* {
                        isSubmitting ?
                            <Loader />
                            :
                    } */}
                    <button
                        type="submit"
                        role="button"
                        enterKeyHint="send"
                        className="w-full"
                    >
                        book
                    </button>
                    <button type="reset" role="button" className="ml-2 w-full">cancel</button>
                </div>
            </form>
        </main>
    )
};

export default BookArtistsForm;

// const handleDateChange = async (e) => {

//     try {
//         const occasionDate = e.target.value;
//         // const getDateonly = occasionDate.split("-")[2]
//         setAvaliablebool({ date: occasionDate });
//         const isDateBooked = await portinstance.get('artist/dates', {
//             params: {
//                 date: occasionDate,
//             }
//         });

//     } catch (error) {
//         if (error.response?.status === 409) {
//             alert(error.response.data.message)
//             setError('date', {
//                 type: "validate",
//                 message: error.response.data.message
//             })
//         }
//     }
// };

// useEffect(() => {
//     if (!getdataofselectedartists) {
//         console.log(typeof useArtisthook.getBookedArtists())
//         console.log("selected artist deleted")
//         const getBookedartistRes = useArtisthook.getBookedArtists();
//         setSelected(getBookedartistRes);
//         console.log("getBookedartistRes:", getBookedartistRes);
//     };
// }, []);