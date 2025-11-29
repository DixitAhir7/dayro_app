import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Allartistsblogs from 'components/artistcomponents/blogscomponents/Allartistsblogs';
import { useArtist } from 'Customhooks/useArtist/Getartistscontext';
import 'animate.css';
import Allgivennicknames from 'components/artistcomponents/searchedartists/Allgivennicknames';


function Kalakar() {

    const useartisthook = useArtist();
    const location = useLocation();

    const [found, setFound] = useState('');

    const searchRef = useRef(null);


    const Searchresult = useartisthook.sortArtists.filter((artist) => {
        return artist.name.toLowerCase().includes(found.toLowerCase())
    });

    const handleSearchedValue = () => setFound("");

    /*
     dedicated to srinivas ramanujan for his work in infinity and
     shri ishardan gadhvi
     */

    const handleKeyDown = (e) => {
        if (e.ctrlKey && e.key === 'i') {
            e.preventDefault();
            searchRef.current?.focus();
        }
    };

    const runAnimation = () => {
        location.pathname === '/kalakar' && searchRef.current.classList.add('animate__zoomInLeft');
    };


    useEffect(() => {
        const countDay = 24 * 60 * 60 * 1000;

        const whenentered = Date.now();
        localStorage.setItem('enteredtime', JSON.stringify(whenentered));

        const aboutProcess = new AbortController();
        aboutProcess.signal

        const asperTime = () => {
            if (whenentered < countDay) {
                return;
            } else {
                runAnimation();
            };
        }

        window.addEventListener('load', asperTime);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('load', asperTime)
            window.removeEventListener('keydown', handleKeyDown)
        };
    }, []);

    // it's not running on kalakr page load insted it runs on whole app load
    // it runs after 24 hours only after it ran 1st time

    // useEffect(() => {
    //     window.addEventListener('keydown', () => {
    //         return found 
    //         console.log("key pressed")
    //     })
    // }, [])

    return (
        <>
            {location.pathname === '/kalakar' && (
                <h1 className='text-center max-[550px]:text-xl'>Search your favorite Kalakar</h1>)}

            <section className="w-full flex justify-center">
                <form name='searchform'>
                    <input
                        type='search'
                        ref={searchRef}
                        value={found}
                        name='searchInput'
                        onChange={(e) => setFound(e.target.value)}
                        className='select-none border-1 p-1 w-200 animate__animated max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl max-[550px]:w-60 max-[400px]:w-81'
                        enterKeyHint='search'
                        placeholder='search artist'
                        role='searchbox'
                        autoFocus
                    />

                    {/* <cite></cite>
                        <div className="gcse-search"></div> */}

                    <div className="searchdiv fixed">
                        {
                            found &&
                            (
                                Searchresult?.map((artist) => (
                                    <div
                                        key={artist._id}
                                        className="suggestions p-1 w-full max-w-md bg-gray-800 text-white">

                                        {/* 1 thing that searchable kalakar has that other won't */}
                                        <Link
                                            onClick={handleSearchedValue}
                                            to={`${artist.name}`}>
                                            {artist.name}
                                        </Link>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </form>
            </section>
            {/* <Allgivennicknames /> */}
            {/* <Allartistsblogs /> */}
            <Outlet />
        </>
    )
};

export default Kalakar;