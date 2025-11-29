import React from 'react';
import { Bot } from 'lucide-react';

/**
 * component for ask for write or complete tasks such as in bookartistform for sending notes
 * or let artist improve writing when writing updates or blogs etc... 
*/
export default function Asktocomplete({
    onComplete
}) {
    return (
        <>
            <Bot onClick={onComplete} />
        </>
    )
};