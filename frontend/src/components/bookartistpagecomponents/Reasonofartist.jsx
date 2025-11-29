import React from 'react';


// get voluntary msg from artist into visibletoartist profile and show on image
export function Reasonofartist({
    handlereasonshowtooltip,
    handlereasonclosetooltip,
    msg
}) {
    return (
        <>
            <span
                onPointerEnter={handlereasonshowtooltip}
                onPointerLeave={handlereasonclosetooltip}
                className="absolute top-1 right-0 text-white text-xs px-2 w-fit bg-gray-400">{msg}</span>
        </>
    )
};