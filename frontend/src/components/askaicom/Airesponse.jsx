import { Speech } from 'lucide-react';
import React from 'react';
import Reviewsofresponse from './Reviewsofresponse';


/*
ai response component,
suggest simmiliar prompts based on previous asked question
*/

export default function Airesponse({
    ans,
    ttsapi
}) {
    return (
        <>
            <div id='ans'>
                <p className="mt-4 w-full mx-auto px-2 text-sm sm:text-base break-words whitespace-pre-line">
                    OPENAI: {ans}
                </p>
                <Speech onClick={ttsapi} />
            </div>
            <Reviewsofresponse />
        </>
    )
};