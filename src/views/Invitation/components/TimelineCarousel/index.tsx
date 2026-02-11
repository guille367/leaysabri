import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image';
import './styles.scss'

interface Photo {
    src: string
    alt?: string
    year: number
}

interface TimelineCarouselProps {
    photos: Photo[]
    title?: string
    startYear?: number
    endYear?: number
    className?: string
}

export default function TimelineCarousel({
    photos,
    title,
    startYear = 2013,
    endYear = 2026,
    className = ''
}: TimelineCarouselProps) {
    const [currentYear, setCurrentYear] = useState(startYear)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalPhotoIndex, setModalPhotoIndex] = useState(0)
    const timelineRef = useRef<HTMLDivElement>(null)

    // Scroll the active year button to the center of the timeline
    const centerActiveYear = useCallback(() => {
        const timeline = timelineRef.current
        if (!timeline) return

        const activeButton = timeline.querySelector('.inv-carousel__year--active') as HTMLElement | null
        if (!activeButton) return

        const timelineRect = timeline.getBoundingClientRect()
        const buttonRect = activeButton.getBoundingClientRect()

        // Calculate the scroll position that centers the active button
        const scrollLeft = activeButton.offsetLeft - (timelineRect.width / 2) + (buttonRect.width / 2)

        timeline.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        })
    }, [])

    // Center the active year whenever currentYear changes
    useEffect(() => {
        // Small delay to ensure the DOM has updated the active class
        const timer = setTimeout(centerActiveYear, 50)
        return () => clearTimeout(timer)
    }, [currentYear, centerActiveYear])

    const years = Array.from(
        { length: endYear - startYear + 1 },
        (_, i) => startYear + i
    )

    const filteredPhotos = photos.filter(photo => photo.year === currentYear)
    const photoCount = filteredPhotos.length

    // Sort all photos by year for modal navigation
    const allPhotosSorted = [...photos].sort((a, b) => a.year - b.year)

    const goToPreviousYear = () => {
        const currentIndex = years.indexOf(currentYear)
        if (currentIndex > 0) {
            setCurrentYear(years[currentIndex - 1])
        }
    }

    const goToNextYear = () => {
        const currentIndex = years.indexOf(currentYear)
        if (currentIndex < years.length - 1) {
            setCurrentYear(years[currentIndex + 1])
        }
    }

    const openModal = (filteredIndex: number) => {
        // Find the global index of this photo in allPhotosSorted
        const clickedPhoto = filteredPhotos[filteredIndex]
        const globalIndex = allPhotosSorted.findIndex(
            (p, i) => p.src === clickedPhoto.src && p.year === clickedPhoto.year &&
                allPhotosSorted.slice(0, i).filter(x => x.src === clickedPhoto.src && x.year === clickedPhoto.year).length ===
                filteredPhotos.slice(0, filteredIndex).filter(x => x.src === clickedPhoto.src && x.year === clickedPhoto.year).length
        )
        setModalPhotoIndex(globalIndex >= 0 ? globalIndex : 0)
        setModalOpen(true)
        document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
        setModalOpen(false)
        document.body.style.overflow = ''
    }

    // Keyboard navigation for modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!modalOpen) return

            if (e.key === 'Escape') {
                closeModal()
            } else if (e.key === 'ArrowLeft') {
                goToPreviousPhoto()
            } else if (e.key === 'ArrowRight') {
                goToNextPhoto()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [modalOpen])

    const goToPreviousPhoto = () => {
        setModalPhotoIndex(prev =>
            prev > 0 ? prev - 1 : allPhotosSorted.length - 1
        )
    }

    const goToNextPhoto = () => {
        setModalPhotoIndex(prev =>
            prev < allPhotosSorted.length - 1 ? prev + 1 : 0
        )
    }

    const hasPreviousYear = years.indexOf(currentYear) > 0
    const hasNextYear = years.indexOf(currentYear) < years.length - 1

    // Get current photo in modal
    const currentModalPhoto = allPhotosSorted[modalPhotoIndex]

    // Determine grid class based on photo count
    const getGridClass = () => {
        if (photoCount === 1) return 'inv-carousel__track--single'
        if (photoCount === 2) return 'inv-carousel__track--double'
        return ''
    }

    return (
        <section className={`inv-carousel ${className}`}>
            {title && (
                <motion.h2
                    className="inv-carousel__title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {title}
                </motion.h2>
            )}
            <div className="inv-carousel__header">
                <button
                    className={`inv-carousel__nav inv-carousel__nav--prev ${!hasPreviousYear ? 'inv-carousel__nav--disabled' : ''}`}
                    onClick={goToPreviousYear}
                    disabled={!hasPreviousYear}
                    aria-label="Año anterior"
                >
                    <span className="inv-carousel__nav-year">
                        {hasPreviousYear ? years[years.indexOf(currentYear) - 1] : ''}
                    </span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <motion.h3
                    className="inv-carousel__current-year"
                    key={currentYear}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {currentYear}
                </motion.h3>

                <button
                    className={`inv-carousel__nav inv-carousel__nav--next ${!hasNextYear ? 'inv-carousel__nav--disabled' : ''}`}
                    onClick={goToNextYear}
                    disabled={!hasNextYear}
                    aria-label="Año siguiente"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                    <span className="inv-carousel__nav-year">
                        {hasNextYear ? years[years.indexOf(currentYear) + 1] : ''}
                    </span>
                </button>
            </div>

            <div className="inv-carousel__container">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentYear}
                        className={`inv-carousel__track ${getGridClass()}`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                    >
                        {filteredPhotos.length > 0 ? (
                            filteredPhotos.map((photo, index) => (
                                <button
                                    key={index}
                                    className="inv-carousel__slide"
                                    onClick={() => openModal(index)}
                                    aria-label={`Ver foto ${index + 1}`}
                                >
                                    <Image
                                        src={photo.src}
                                        alt={photo.alt || `Foto ${index + 1}`}
                                        width={500}
                                        height={500}
                                        className="inv-carousel__image"
                                    />
                                </button>
                            ))
                        ) : (
                            <div className="inv-carousel__empty">
                                <p>No hay fotos de {currentYear}</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="inv-carousel__timeline" ref={timelineRef}>
                {years.map(year => (
                    <button
                        key={year}
                        className={`inv-carousel__year ${year === currentYear ? 'inv-carousel__year--active' : ''}`}
                        onClick={() => setCurrentYear(year)}
                    >
                        {year}
                    </button>
                ))}
            </div>

            {/* Fullscreen Modal — portaled to body to escape transform context */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {modalOpen && allPhotosSorted.length > 0 && currentModalPhoto && (
                        <motion.div
                            className="inv-carousel__modal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={closeModal}
                        >
                            <button
                                className="inv-carousel__modal-close"
                                onClick={closeModal}
                                aria-label="Cerrar"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>

                            <motion.div
                                className="inv-carousel__modal-year"
                                key={currentModalPhoto.year}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {currentModalPhoto.year}
                            </motion.div>

                            <button
                                className="inv-carousel__modal-nav inv-carousel__modal-nav--prev"
                                onClick={(e) => { e.stopPropagation(); goToPreviousPhoto(); }}
                                aria-label="Foto anterior"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    className="inv-carousel__modal-content"
                                    onClick={(e) => e.stopPropagation()}
                                    key={modalPhotoIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <img
                                        src={currentModalPhoto.src}
                                        alt={currentModalPhoto.alt || `Foto ${modalPhotoIndex + 1}`}
                                        className="inv-carousel__modal-image"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            <button
                                className="inv-carousel__modal-nav inv-carousel__modal-nav--next"
                                onClick={(e) => { e.stopPropagation(); goToNextPhoto(); }}
                                aria-label="Foto siguiente"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>

                            <div className="inv-carousel__modal-counter">
                                {modalPhotoIndex + 1} / {allPhotosSorted.length}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    )
}
