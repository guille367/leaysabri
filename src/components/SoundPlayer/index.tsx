'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'

export default function SoundPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        const audio = new Audio('/song.m4a')
        audio.loop = true
        audioRef.current = audio

        const handleEnded = () => {
            audio.currentTime = 0
            audio.play()
        }
        audio.addEventListener('ended', handleEnded)

        const startOnInteraction = () => {
            audio.play().then(() => {
                setIsPlaying(true)
            }).catch(() => {})
            window.removeEventListener('click', startOnInteraction)
            window.removeEventListener('touchend', startOnInteraction)
        }

        window.addEventListener('click', startOnInteraction)
        window.addEventListener('touchend', startOnInteraction)

        return () => {
            audio.removeEventListener('ended', handleEnded)
            window.removeEventListener('click', startOnInteraction)
            window.removeEventListener('touchend', startOnInteraction)
            audio.pause()
            audioRef.current = null
        }
    }, [])

    const toggle = () => {
        const audio = audioRef.current
        if (!audio) return

        if (isPlaying) {
            audio.pause()
            setIsPlaying(false)
        } else {
            audio.play().catch(() => {
                setIsPlaying(false)
            })
            setIsPlaying(true)
        }
    }

    return (
        <button
            className={`${styles.soundButton} ${isPlaying ? styles.playing : ''}`}
            onClick={toggle}
            aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
            {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                </svg>
            ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
            )}
        </button>
    )
}
