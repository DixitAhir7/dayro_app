import React, { useMemo, useState, useEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { Html, useVideoTexture } from '@react-three/drei'

export default function MediaPlane({ item }) {
    const { type, src, pos } = item
    const [playing, setPlaying] = useState(false)

    const imageTexture = type === "image" ? useLoader(TextureLoader, src) : null

    const videoEl = useMemo(() => {
        if (type !== "video") return null
        const video = document.createElement("video")
        video.src = src
        video.crossOrigin = "anonymous"
        video.loop = true
        video.muted = true
        video.playsInline = true
        video.preload = "auto"
        return video
    }, [src, type])

    const videoTexture = type === "video" ? useVideoTexture(videoEl) : null

    useEffect(() => {
        if (videoEl) {
            videoEl.play().then(() => setPlaying(true)).catch(err => {
                console.warn("Autoplay blocked:", err)
            })
        }
    }, [videoEl])

    const handleClick = () => {
        if (!videoEl) return
        if (playing) { videoEl.pause(); setPlaying(false) }
        else { videoEl.play(); setPlaying(true) }
    }

    return (
        <>
            <mesh position={pos} onClick={handleClick}>
                <planeGeometry args={[2, 1.2]} />
                <meshBasicMaterial
                    map={type === "image" ? imageTexture : videoTexture}
                    toneMapped={false}
                />
            </mesh>

            {type === "video" && (
                <Html position={[pos[0], pos[1] - 0.9, pos[2]]}>
                    <div style={{
                        background: "rgba(0,0,0,0.6)",
                        color: "white",
                        padding: "6px 10px",
                        borderRadius: 6,
                        fontSize: 12,
                    }}>
                        {playing ? "Playing — click to pause" : "Paused — click to play"}
                    </div>
                </Html>
            )}
        </>
    )
}