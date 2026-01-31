import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './styles.scss'

interface RSVPModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function RSVPModal({ isOpen, onClose }: RSVPModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        attending: 'yes' as 'yes' | 'no',
        guests: 1,
        dietaryRestrictions: '',
        message: '',
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/.netlify/functions/guests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'guests' ? parseInt(value) || 1 : value,
        }))
    }

    const resetAndClose = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            attending: 'yes',
            guests: 1,
            dietaryRestrictions: '',
            message: '',
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
                                        <label htmlFor="name">Nombre completo *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Tu nombre"
                                        />
                                    </div>

                                    <div className="rsvp-modal__row">
                                        <div className="rsvp-modal__field">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="tu@email.com"
                                            />
                                        </div>

                                        <div className="rsvp-modal__field">
                                            <label htmlFor="phone">Teléfono</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+54 11 1234-5678"
                                            />
                                        </div>
                                    </div>

                                    <div className="rsvp-modal__row">
                                        <div className="rsvp-modal__field">
                                            <label htmlFor="attending">¿Vas a asistir?</label>
                                            <select
                                                id="attending"
                                                name="attending"
                                                value={formData.attending}
                                                onChange={handleChange}
                                            >
                                                <option value="yes">Sí, voy a asistir</option>
                                                <option value="no">No puedo asistir</option>
                                            </select>
                                        </div>

                                        {formData.attending === 'yes' && (
                                            <div className="rsvp-modal__field">
                                                <label htmlFor="guests">¿Cuántos asisten?</label>
                                                <select
                                                    id="guests"
                                                    name="guests"
                                                    value={formData.guests}
                                                    onChange={handleChange}
                                                >
                                                    {[1, 2, 3, 4, 5].map(n => (
                                                        <option key={n} value={n}>{n}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                    </div>

                                    {formData.attending === 'yes' && (
                                        <div className="rsvp-modal__field">
                                            <label htmlFor="dietaryRestrictions">Restricciones alimentarias</label>
                                            <input
                                                type="text"
                                                id="dietaryRestrictions"
                                                name="dietaryRestrictions"
                                                value={formData.dietaryRestrictions}
                                                onChange={handleChange}
                                                placeholder="Vegetariano, celíaco, etc."
                                            />
                                        </div>
                                    )}

                                    <div className="rsvp-modal__field">
                                        <label htmlFor="message">Mensaje (opcional)</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Dejanos un mensaje..."
                                            rows={3}
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
