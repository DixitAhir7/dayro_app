import React, { useEffect } from "react";

const handleMediaquerry = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    console.log(`width ${width} height${height}`)
};

// automatically handles mediaquerry
useEffect(() => {
    window.addEventListener('resize', handleMediaquerry)

    return () => window.removeEventListener('resize', handleMediaquerry)
}, []);


// const generaterandomimgs = (imgsrc) => {
//     // generate random images
// };