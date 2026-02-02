import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './styles.scss'

interface Guest {
    id: string
    name: string
    guests: string[]
    guestsAmount: number
    dietaryRestrictions: string
    code: string
    createdAt: string
    updatedAt: string
}

interface RSVPModalProps {
    isOpen: boolean
    onClose: () => void
    guest?: Guest | null
    code?: string
}

const DIETARY_OPTIONS = [
    { value: '', label: 'Sin restricciones' },
    { value: 'vegetariano', label: 'Vegetariano' },
    { value: 'vegano', label: 'Vegano' },
    { value: 'celiaco', label: 'Celíaco' },
    { value: 'kosher', label: 'Kosher' },
    { value: 'otro', label: 'Otro' },
]

export default function RSVPModal({ isOpen, onClose, guest, code }: RSVPModalProps) {
    const [formData, setFormData] = useState({
        name: guest?.name || '',
        guestsAmount: guest?.guestsAmount || 1,
        guests: guest?.guests || [],
        dietaryRestrictions: guest?.dietaryRestrictions || '',
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (guest) {
            setFormData({
                name: guest.name || '',
                guestsAmount: guest.guestsAmount || 1,
                guests: guest.guests || [],
                dietaryRestrictions: guest.dietaryRestrictions || '',
            })
        }
    }, [guest])

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

    const handleGuestsAmountChange = (newAmount: number) => {
        const currentGuests = [...formData.guests]
        if (newAmount > formData.guestsAmount) {
            // Add empty strings for new guests
            while (currentGuests.length < newAmount - 1) {
                currentGuests.push('')
            }
        } else {
            // Remove extra guests
            currentGuests.splice(newAmount - 1)
        }
        setFormData(prev => ({
            ...prev,
            guestsAmount: newAmount,
            guests: currentGuests,
        }))
    }

    const handleGuestNameChange = (index: number, value: string) => {
        const newGuests = [...formData.guests]
        newGuests[index] = value
        setFormData(prev => ({
            ...prev,
            guests: newGuests,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const isUpdate = guest?.id
            const response = await fetch('/api/guests', {
                method: isUpdate ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    ...(isUpdate ? { id: guest.id } : {}),
                    code: code || '',
                }),
            })

            if (!response.ok) {
                throw new Error('Error al enviar el formulario')
            }

            setSuccess(true)
        } catch (err) {
            setError('Hubo un error al enviar tu confirmación. Por favor intentá de nuevo.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const resetAndClose = () => {
        setFormData({
            name: '',
            guestsAmount: 1,
            guests: [],
            dietaryRestrictions: '',
        })
        setSuccess(false)
        setError(null)
        onClose()
    }

    return (
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
                                <p>Hemos recibido tu confirmación. Nos vemos pronto.</p>
                                <button className="rsvp-modal__button" onClick={resetAndClose}>
                                    Cerrar
                                </button>
                            </div>
                        ) : (
                            <>
                                <h2 className="rsvp-modal__title">Confirmá tu asistencia</h2>

                                <form className="rsvp-modal__form" onSubmit={handleSubmit}>
                                    <div className="rsvp-modal__field">
                                        <label htmlFor="name">Tu nombre *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Tu nombre completo"
                                        />
                                    </div>

                                    <div className="rsvp-modal__field">
                                        <label htmlFor="guestsAmount">¿Cuántos asisten en total?</label>
                                        <select
                                            id="guestsAmount"
                                            name="guestsAmount"
                                            value={formData.guestsAmount}
                                            onChange={(e) => handleGuestsAmountChange(parseInt(e.target.value))}
                                        >
                                            {[1, 2, 3, 4, 5].map(n => (
                                                <option key={n} value={n}>{n}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {formData.guestsAmount > 1 && (
                                        <div className="rsvp-modal__guests-list">
                                            <label>Nombres de los acompañantes</label>
                                            {Array.from({ length: formData.guestsAmount - 1 }).map((_, index) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    value={formData.guests[index] || ''}
                                                    onChange={(e) => handleGuestNameChange(index, e.target.value)}
                                                    placeholder={`Acompañante ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    <div className="rsvp-modal__field">
                                        <label htmlFor="dietaryRestrictions">Restricciones alimentarias</label>
                                        <select
                                            id="dietaryRestrictions"
                                            name="dietaryRestrictions"
                                            value={formData.dietaryRestrictions}
                                            onChange={handleChange}
                                        >
                                            {DIETARY_OPTIONS.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {error && (
                                        <div className="rsvp-modal__error">{error}</div>
                                    )}

                                    <button
                                        type="submit"
                                        className="rsvp-modal__button"
                                        disabled={loading}
                                    >
                                        {loading ? 'Enviando...' : 'Confirmar'}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
