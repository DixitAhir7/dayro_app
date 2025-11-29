import { EllipsisVertical } from 'lucide-react';
import React from 'react';
import { useIsMobile } from 'utilits/reusableCode/usefulcode';


// reuse this component to dispaly in any screen

export default function Bookeddisplay({
    image,
    altName,
    openDots,
    remove
}) {

    const ismobile = useIsMobile(768);

    return (
        <>
            <img
                loading="lazy"
                src={`http://localhost:9626/${image}`}
                className="size-55 block object-cover"
                alt={altName}
            />
            {
                ismobile ?
                    <EllipsisVertical
                        onTouchStart={openDots}
                        className="text-white text-xl"
                    />
                    :
                    <EllipsisVertical
                        onClick={openDots}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xl mt-2"
                    />
            }


            <div className="absolute top-10 right-2 z-10">
                <span
                    className='text-white'
                    onClick={remove}
                >
                    cancel
                </span>
            </div>
        </>
    )
};