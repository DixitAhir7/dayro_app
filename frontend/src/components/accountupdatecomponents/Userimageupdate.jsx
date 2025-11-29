import React from 'react';

// image editing modal in accountupdate
export default function Userimageupdate({
    imgref,
    changeimg,
    editModal,
    imgSrc
}) {
    return (
        <>
            <input
                name='userimg'
                ref={imgref}
                onChange={changeimg}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
            />

            <img
                onClick={editModal}
                src={imgSrc}
                className='rounded-full h-20 w-22.5 object-cover'
            />

            {/* only artists can see image when user booked & only booked artists by specfic user not all */}
        </>
    )
};