import React, { useEffect, useState } from 'react';
import _ from 'lodash';

// dispaly dates of selected artists if they are booked in modal
export default function Displaybookedartistdates({ close }) {

    // 🧞‍♀️alloccasion dates of that artist
    const [bookedartistdate, setBookedartistdate] = useState([]);

    useEffect(() => {
        const getonmount = JSON.parse(localStorage.getItem('groupeddata'));
        setBookedartistdate(getonmount);
        console.log(getonmount);
    }, []);


    // group data of dates,artistnames
    // const groupeddata = bookedartistdate.map(d => ({
    //     ...d,
    //     artistinfo: _.filter(artistinfo,{ })
    // }))


    return (
        <>
            <div className='w-full h-fit'>
                <div className="flex">
                    <h1>booked dates of artists</h1>
                    <span onClick={close} className='mt-2 text-red-500'>X</span>
                </div>

                {/* display dates when it's booked */}
                <div className="flex flex-wrap overflow-auto">
                    {
                        bookedartistdate.map(d=> (
                            <ul className='mt-3 border p-2 flex-1/2'>
                                <li>booked dates:{d.occasiondate}</li>
                            </ul>
                        ))
                    }
                </div>
            </div>
        </>
    )
};