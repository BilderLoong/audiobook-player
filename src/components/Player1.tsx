
import { useEffect, useRef, useState } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css';

interface PlayerProps {
    techOrder?: string[]
    autoplay: boolean
    controls?: boolean
    sources?: { src: string; type: string }[]
}

export default function Player(props: PlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (!videoRef.current) return;

        const player = videojs(videoRef.current, props)

        return () => {
            // player.dispose()
        }
    }, [props, videoRef])

    return (
        <video ref={videoRef} className="video-js" playsInline />
    )
}