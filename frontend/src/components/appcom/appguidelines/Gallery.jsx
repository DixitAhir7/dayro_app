import React from 'react'
import MediaPlane from './MediaPlane'

// layout three items across a wall; you can change positions
const MEDIA = [
    { type: 'image', src: '/icons/dayro.jpg', pos: [-2.4, 1.6, 0] },
    { type: 'video', src: '/videos/first_ondayro.mp4', pos: [0, 1.6, 0] },
    { type: 'image', src: '/icons/dayro.jpg', pos: [2.4, 1.6, 0] },
]

export default function Gallery() {
    return (
        <group position={[0, 0, -1]}>
            {MEDIA.map((item, i) => (
                <MediaPlane key={i} item={item} />
            ))}
        </group>
    )
};