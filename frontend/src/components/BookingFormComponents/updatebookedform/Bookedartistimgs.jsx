import React, { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { useArtist } from 'Customhooks/useArtist/Getartistscontext';
import { EllipsisVertical } from 'lucide-react';
import { Link } from 'react-router-dom';


// booked artists images handling after booked before occasion
export default function Bookedartistimgs({ removeartist, imgname, img, openedit }) {

    return (
        <>
            <>
                <img src={img} alt={imgname} />

                <EllipsisVertical
                    onClick={openedit}
                    className="absolute top-2 right-2 group-hover:opacity-100 transition-opacity text-xl cursor-pointer"
                />

                {showMenu === img._id && (
                    <div className="absolute top-10 right-2 z-10 bg-white p-1 shadow-lg">
                        <span onClick={() => removeartist(img._id)} className="block cursor-pointer">
                            Remove
                        </span>
                        <Link to="/" className="block hover:underline">
                            add more
                        </Link>
                    </div>
                )}
            </>

        </ >
    )
};