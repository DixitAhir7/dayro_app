import { useArtist } from 'customhooks/useArtist/Getartistscontext';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'animate.css';
import { Canvas } from '@react-three/fiber';
import Gallery from './Gallery';
import { OrbitControls } from '@react-three/drei';

export default function Whychoosedayro() {

    const msgRef = useRef(null);

    const useartisthook = useArtist();

    const copySucced = () => {
        if (!toast.isActive(msgRef.current)) {
            msgRef.current = toast("link copied sucefully");
        }
    };

    // works with https domain only
    const copyLink = () => {
        const copiedLink = navigator.share({
            title: "dayro",
            text: "be an artist",
            url: "https://localhost:5173/",
        });
        return copiedLink;
    };

    const addClass = () => {
        const select = document.querySelector('#fid');
        const ifTouched = select.classList.add("animate__pulse");

        if (ifTouched) {
            select.classList.remove('animate__pulse')
        }
    }

    return (
        <>
            <Link
                to="/beartist"
                className='max-sm:text-xl animate__animated md:text-2xl'>
                want to be an artist? go to artist page
            </Link>

            {/* copy to clipboard */}
            <div className="flex mt-2.5">
                <Link
                    className='text-xl'
                    to="/">
                    send to your favorite artist
                </Link>
                <button className='ml-2 py-0' onClick={copyLink} type='button'>copy</button>
            </div>

            {/* <ToastContainer
                position='top-center'
                pauseOnHover={true}
                hideProgressBar={true}
                autoClose={2000}
                closeButton={true}
            /> */}

            {/* <Link to="readfile">read article about how world is changing</Link> */}

            {/* <Canvas camera={{ position: [0, 1.6, 4], fov: 50 }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 10, 5]} intensity={0.6} />
                <Gallery />
                <OrbitControls />
            </Canvas> */}

            {/* <div className='w-full'>
                <img
                    src="/icons/dayro.jpg"
                    alt="dayroimage"
                    className='block'
                    loading='lazy'
                />
            </div> */}
            <span id='fid' onTouchStart={addClass} className='text-xl cursor-crosshair animate__animated max-sm:ml-1 text-orange-400'>this is the future</span>
        </>
    )
};