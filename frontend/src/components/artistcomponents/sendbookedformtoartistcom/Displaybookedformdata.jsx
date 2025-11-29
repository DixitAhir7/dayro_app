import React from 'react';

// for displaying request of booking events
export default function Displaybookedformdata({
    closeModal,
    reasonmodal,
    phoneno,
    occasionName,
    occasionlocation,
    occasiondate,
    whobooked
}) {
    return (
        <>
            <div id="occasioninfo">
                <ul>
                    <li>occasion: {occasionName}</li>
                    <li>location: {occasionlocation}</li>
                    <li>Date: {occasiondate}</li>
                    <a href={`tel:+91 ${phoneno}`}>TALK DIRECTLY: {phoneno}</a>
                    <li>whosbooking: {whobooked}</li>
                </ul>
                {/* <h2 className='text-xl'>booked artists:</h2>
                <ul>
                    <li>kirtidan gadhvi,</li>
                    <li>rajbbha gadhvi,</li>
                    <li>devayt khavad,</li>
                    <li>geetaben rabari</li>
                </ul> */}

                {/* if valid number of user and when clicked on it,
                     then it should redirect artist to directly phone pad in call */}


            </div>
        </>
    )
};