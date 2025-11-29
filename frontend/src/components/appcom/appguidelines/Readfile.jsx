import { useArtist } from 'customhooks/useArtist/Getartistscontext'
import React from 'react'

export default function Readfile() {

    const useartisthook = useArtist();
    console.log(useartisthook.isfile)

    return (
        <main>
            <article>{useartisthook.isfile}</article>
        </main>
    )
};