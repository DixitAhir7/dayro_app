import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useArtist } from 'Customhooks/useArtist/Getartistscontext';
import { EllipsisVertical, TableOfContents } from 'lucide-react';


// when user select artist book display it in right sidebar
function SelectedBookartists() {
    const useBookedhook = useArtist();
    const [showMenu, setShowMenu] = useState(false);

    const opendots = (id) => {
        setShowMenu(showMenu === id ? null : id);
    };

    return (
        <>
            <div className="h-svh w-64 border-l-1 fixed right-0 top-0 overflow-auto p-3">
                <TableOfContents
                    onClick={useBookedhook.handleBooked}
                    className="text-2xl ml-52"
                />

                {useBookedhook.isSelectedKalakar.map(artist => (
                    <div key={artist._id} className="relative group inline-block">
                        <img
                            loading="lazy"
                            src={`http://localhost:9626/${artist.artistimg}`}
                            className="h-55 w-68 block mt-1.5"
                            alt={artist.name}
                        />

                        <EllipsisVertical
                            onClick={() => opendots(artist._id)}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xl mt-2"
                        />

                        {
                            showMenu === artist._id && (
                                <div className="absolute top-10 right-2 z-10">
                                    <span className='text-white' onClick={() => useBookedhook.removeartist(artist._id)}>cancel</span>
                                </div>
                            )
                        }
                    </div>
                ))}

                {!useBookedhook.isSelectedKalakar.length > 0 ?
                    <>
                        <h1 className='text-5xl m-3.5'>
                            Select Kalakar<br />
                            to book
                        </h1>
                        <span onClick={() => useBookedhook.getBookedArtists()}>can't see booked here? press</span>
                    </>
                    :

                    // if booked then display to person b that it is booked for this date
                    <Link
                        to='/bookartistsform'
                        className='text-center text-xl'>Book Kalakaro
                    </Link>
                }
            </div>
        </>
    )
}

export default React.memo(SelectedBookartists);