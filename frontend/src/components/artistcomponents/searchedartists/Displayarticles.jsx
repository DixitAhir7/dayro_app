import { useArtist } from 'customhooks/useArtist/Getartistscontext';
import React from 'react'

export default function Displayarticles() {

    const useartist = useArtist();

    return (
        <>
        {
            console.log(useartist.SortedArtists)
        }
        </>
    )
};