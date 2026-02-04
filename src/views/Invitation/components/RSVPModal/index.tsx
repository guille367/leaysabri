import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './styles.scss'

interface Guest {
    id: string
    name: string
    guests: string[]
    guestsAmount: number
    dietaryRestrictions: string
    code: string
    confirmado: boolean
    createdAt: string
    updatedAt: string
}

interface RSVPModalProps {
    isOpen: boolean
    onClose: () => void
    guest?: Guest | null
    code?: string
    onConfirmed?: () => void
}

export default function RSVPModal({ isOpen, onClose, guest, code, onConfirmed }: RSVPModalProps) {
    const [guestNames, setGuestNames] = useState<string[]>([])
    const [dietaryRestrictions, setDietaryRestrictions] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const hasGuests = (guest?.guestsAmount || 0) > 0
    const guestsCount = (guest?.guestsAmount || 0)

    useEffect(() => {
        if (guest) {
            // Initialize guest names array based on guestsAmount
            const initialGuests = guest.guests?.length
                ? [...guest.guests]
                : Array(guestsCount).fill('')
            setGuestNames(initialGuests)
            setDietaryRestrictions(guest.dietaryRestrictions || '')
        }
    }, [guest, guestsCount])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        if (isOpen) {
            document.body.style.overflow = 'hidden'
            window.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    const handleGuestNameChange = (index: number, value: string) => {
        const newGuests = [...guestNames]
        newGuests[index] = value
        setGuestNames(newGuests)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!guest?.id) return

        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/guests', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: guest.id,
                    guests: guestNames,
                    dietaryRestrictions,
                    confirmado: true,
                    code: guest.code,
                }),
            })

            if (!response.ok) {
                throw new Error('Error al enviar el formulario')
            }

            setSuccess(true)
            onConfirmed?.()
        } catch (err) {
            setError('Hubo un error al enviar tu confirmación. Por favor intentá de nuevo.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const resetAndClose = () => {
        setSuccess(false)
        setError(null)
        onClose()
    }

    if (typeof document === 'undefined') return null

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="rsvp-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={resetAndClose}
                >
                    <motion.div
                        className="rsvp-modal__content"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="rsvp-modal__close"
                            onClick={resetAndClose}
                            aria-label="Cerrar"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        {success ? (
                            <div className="rsvp-modal__success">
                                <div className="rsvp-modal__success-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                        <path d="M22 4L12 14.01l-3-3" />
                                    </svg>
                                </div>
                                <h3>¡Gracias por confirmar!</h3>
                                <p>Te esperamos con muchas ganas. ¡Nos vemos pronto!</p>
                                <button className="rsvp-modal__button" onClick={resetAndClose}>
                                    Cerrar
                                </button>
                            </div>
                        ) : (
                            <>
                                <h2 className="rsvp-modal__title">
                                    {hasGuests
                                        ? `${guest?.name}, confirmá tu asistencia`
                                        : `¡Hola ${guest?.name}!`
                                    }
                                </h2>

                                {hasGuests ? (
                                    <form className="rsvp-modal__form" onSubmit={handleSubmit}>
                                        <p className="rsvp-modal__intro">
                                            Por favor ingresá los nombres de tus invitados:
                                        </p>

                                        <div className="rsvp-modal__guests-list">
                                            {Array.from({ length: guestsCount }).map((_, index) => (
                                                <div key={index} className="rsvp-modal__field">
                                                    <input
                                                        type="text"
                                                        value={guestNames[index] || ''}
                                                        onChange={(e) => handleGuestNameChange(index, e.target.value)}
                                                        placeholder={`Acompañante ${index + 1}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="rsvp-modal__field">
                                            <label htmlFor="dietaryRestrictions">Restricciones alimentarias</label>
                                            <input
                                                type="text"
                                                id="dietaryRestrictions"
                                                value={dietaryRestrictions}
                                                onChange={(e) => setDietaryRestrictions(e.target.value)}
                                                placeholder="Ej: vegetariano, celíaco, etc."
                                            />
                                        </div>

                                        {error && (
                                            <div className="rsvp-modal__error">{error}</div>
                                        )}

                                        <button
                                            type="submit"
                                            className="rsvp-modal__button"
                                            disabled={loading}
                                        >
                                            {loading ? 'Enviando...' : 'Confirmar asistencia'}
                                        </button>
                                    </form>
                                ) : (
                                    <form className="rsvp-modal__form" onSubmit={handleSubmit}>
                                        <p className="rsvp-modal__greeting">
                                            ¡Qué alegría que puedas venir! Estamos muy emocionados de compartir este día tan especial con vos.
                                        </p>

                                        <div className="rsvp-modal__field">
                                            <label htmlFor="dietaryRestrictions">¿Tenés alguna restricción alimentaria?</label>
                                            <input
                                                type="text"
                                                id="dietaryRestrictions"
                                                value={dietaryRestrictions}
                                                onChange={(e) => setDietaryRestrictions(e.target.value)}
                                                placeholder="Ej: vegetariano, celíaco, etc."
                                            />
                                        </div>

                                        {error && (
                                            <div className="rsvp-modal__error">{error}</div>
                                        )}

                                        <button
                                            type="submit"
                                            className="rsvp-modal__button"
                                            disabled={loading}
                                        >
                                            {loading ? 'Enviando...' : '¡Confirmo mi asistencia!'}
                                        </button>
                                    </form>
                                )}
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    )
}
