import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './styles.scss'
import Button from '../Button'

interface AccountData {
    accountType: string
    alias: string
}

interface BankingData {
    bankName: string
    accountHolder: string
    pesos: AccountData
    dolares: AccountData
}

interface CTASectionProps {
    guestName?: string
    guestsAmount?: number
    isConfirmed?: boolean
    rsvpTitle?: string
    rsvpDescription?: string
    rsvpButtonText?: string
    rsvpUrl?: string
    onRSVPClick?: () => void
    giftTitle?: string
    giftDescription?: string
    giftButtonText?: string
    giftUrl?: string
    bankingData?: BankingData
    className?: string
}

export default function CTASection({
    guestName,
    guestsAmount = 1,
    isConfirmed = false,
    rsvpTitle = '¿Venís?',
    rsvpDescription = 'Para una mejor organización, es muy importante que nos ayudes confirmando tu asistencia:',
    rsvpButtonText = 'RSVP',
    rsvpUrl = '#',
    onRSVPClick,
    giftTitle = '¿Querés regalarnos?',
    giftDescription = 'Haciendo click en el siguiente botón podés ver nuestros elegidos. ¡Gracias!',
    giftButtonText = 'REGALÁ',
    giftUrl = '#',
    bankingData,
    className = ''
}: CTASectionProps) {
   

    const personalizedDescription = guestName
        ? guestsAmount > 0
            ? `${guestName}, nos encantaría que vos y tus invitados vengan. Para una mejor organización, es muy importante que nos ayudes confirmando su asistencia`
            : `${guestName}, nos encantaría que vengas. Para una mejor organización, es muy importante que nos ayudes confirmando tu asistencia.`
        : rsvpDescription
    const [modalOpen, setModalOpen] = useState(false)

    const openModal = () => {
        setModalOpen(true)
        document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
        setModalOpen(false)
        document.body.style.overflow = ''
    }

    // Close modal on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && modalOpen) {
                closeModal()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [modalOpen])

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    return (
        <section className={`inv-cta ${className}`}>
            {/* RSVP Column */}
            <motion.div
                className="inv-cta__column"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="inv-cta__title">
                    {isConfirmed ? '¡Gracias por confirmar!' : rsvpTitle}
                </h2>
                <p className="inv-cta__description">
                    {isConfirmed
                        ? `${guestName}, ya confirmaste tu asistencia. ¡Nos vemos pronto!`
                        : personalizedDescription
                    }
                </p>
                {isConfirmed ? (
                    <Button variant="primary" disabled>
                        Te esperamos ❤️
                    </Button>
                ) : onRSVPClick ? (
                    <Button onClick={onRSVPClick} variant="primary">
                        {rsvpButtonText}
                    </Button>
                ) : (
                    <Button href={rsvpUrl} variant="primary">
                        {rsvpButtonText}
                    </Button>
                )}
            </motion.div>

            {/* Gift Column */}
            <motion.div
                className="inv-cta__column"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.15, duration: 0.6 }}
            >
                <h2 className="inv-cta__title">{giftTitle}</h2>
                <p className="inv-cta__description">{giftDescription}</p>
                {bankingData ? (
                    <Button onClick={openModal} variant="primary">
                        {giftButtonText}
                    </Button>
                ) : (
                    <Button href={giftUrl} variant="primary">
                        {giftButtonText}
                    </Button>
                )}
            </motion.div>

            {/* Banking Modal — portaled to body to escape transform context */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {modalOpen && bankingData && (
                        <motion.div
                            className="inv-cta__modal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={closeModal}
                        >
                            <motion.div
                                className="inv-cta__modal-content"
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.3 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className="inv-cta__modal-close"
                                    onClick={closeModal}
                                    aria-label="Cerrar"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>

                                <h3 className="inv-cta__modal-title">Datos bancarios</h3>

                                <div className="inv-cta__modal-data">
                                    <div className="inv-cta__modal-row">
                                        <span className="inv-cta__modal-label">Banco</span>
                                        <span className="inv-cta__modal-value">{bankingData.bankName}</span>
                                    </div>

                                    <div className="inv-cta__modal-row">
                                        <span className="inv-cta__modal-label">Titular</span>
                                        <span className="inv-cta__modal-value">{bankingData.accountHolder}</span>
                                    </div>
                                </div>

                                <div className="inv-cta__modal-section">
                                    <h4 className="inv-cta__modal-subtitle">Cuenta en Pesos</h4>
                                    <div className="inv-cta__modal-data">
                                        <div className="inv-cta__modal-row">
                                            <span className="inv-cta__modal-label">Tipo de cuenta</span>
                                            <span className="inv-cta__modal-value">{bankingData.pesos.accountType}</span>
                                        </div>

                                        <div className="inv-cta__modal-row inv-cta__modal-row--copyable">
                                            <span className="inv-cta__modal-label">Alias</span>
                                            <div className="inv-cta__modal-value-group">
                                                <span className="inv-cta__modal-value">{bankingData.pesos.alias}</span>
                                                <button
                                                    className="inv-cta__modal-copy"
                                                    onClick={() => copyToClipboard(bankingData.pesos.alias)}
                                                    aria-label="Copiar Alias"
                                                >
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="inv-cta__modal-section">
                                    <h4 className="inv-cta__modal-subtitle">Cuenta en Dólares</h4>
                                    <div className="inv-cta__modal-data">
                                        <div className="inv-cta__modal-row">
                                            <span className="inv-cta__modal-label">Tipo de cuenta</span>
                                            <span className="inv-cta__modal-value">{bankingData.dolares.accountType}</span>
                                        </div>

                                        <div className="inv-cta__modal-row inv-cta__modal-row--copyable">
                                            <span className="inv-cta__modal-label">Alias</span>
                                            <div className="inv-cta__modal-value-group">
                                                <span className="inv-cta__modal-value">{bankingData.dolares.alias}</span>
                                                <button
                                                    className="inv-cta__modal-copy"
                                                    onClick={() => copyToClipboard(bankingData.dolares.alias)}
                                                    aria-label="Copiar Alias"
                                                >
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="inv-cta__modal-thanks">¡Muchas gracias!</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    )
}
