import React from 'react';
import { ChevronLeft } from 'lucide-react';

// if artist decline request of user for occasion
export default function Declinereasonmodal({
    onsubmit,
    close,
    setReason
}) {
    return (
        <>
            <ChevronLeft onClick={close} />
            <form onSubmit={onsubmit}>
                <textarea
                    name='reason'
                    onChange={setReason}
                    className='w-99'
                    placeholder='please tell user why you are declining '
                />
                <button className='block' type="submit">send</button>
            </form>
        </>
    )
};