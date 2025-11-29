import React, { useState } from 'react';

// display artists's booked dates and ask to conform
export default function Addartists() {

    const getAddedartists = JSON.parse(localStorage.getItem('selectedartistdata'));

    const [isConform, setConform] = useState(null);

    const handleConform = () => {
        const asktoconform = prompt("conform?(yes/no)").toLowerCase().trim();
        if (asktoconform === "yes") {
            setConform(true);
        }
    };

    return (
        <main>
            <h1>booked dates of added artists</h1>
            <ul>
                <li>kirtidan gadhvi</li>
                <li>5-12-2025</li>
            </ul>
            <button onClick={handleConform} type="button">conform</button>
        </main>
    )
};