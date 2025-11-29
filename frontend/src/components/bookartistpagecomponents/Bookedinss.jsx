import { useArtist } from 'customhooks/useArtist/Getartistscontext';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Bookeddisplay from './Bookeddisplay';

// display this component in page in mobile

export default function Bookedinss() {

    const [showMenu, setShowMenu] = useState(false);
    const useBookedhook = useArtist();

    const opendots = (id) => {
        setShowMenu(showMenu === id ? null : id);
    };

    return (
        <>
            <div className="h-svh">
                {useBookedhook.isSelectedKalakar?.map(artist => (
                    <div key={artist._id} className="relative group inline-block">
                        <Bookeddisplay
                            image={artist.artistimg}
                            altName={artist.name}
                            openDots={() => opendots(artist._id)}
                            remove={() => useBookedhook.removeartist(artist._id)}
                        />
                    </div>
                ))}

                {!useBookedhook.isSelectedKalakar?.length > 0 ?
                    <h1 className='text-3xl m-2.5'>Select Kalakar to book</h1> :
                    <Link
                        to='/bookartistsform'
                        className='text-xl'>Book Kalakaro
                    </Link>
                }
            </div>
        </>
    )
};