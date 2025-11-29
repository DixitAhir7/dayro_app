import React, { useState } from 'react'

export default function Aiinput({
    querry,
    handlequeries,
    ask,
    whenblur,
    whenfocus
}) {

    return (
        <>
            <form name='aiform' className="relative flex items-center max-w-4xl mx-auto px-2">
                <input
                    type='text'
                    className='w-full p-2 md:shadow-lg border focus:outline-none'
                    value={querry}
                    onChange={handlequeries}
                    placeholder="Ask me related to DAYRO"
                    enterKeyHint='search'
                    onFocus={whenfocus}
                    onBlur={whenblur}
                />

                <button type='button' enterKeyHint='enter' onClick={ask} className="absolute right-2 rounded-none bg-transparent text-black">
                    Ask
                </button>
            </form>
        </>
    )
};