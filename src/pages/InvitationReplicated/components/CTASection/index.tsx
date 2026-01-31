import { motion } from 'framer-motion'
import './styles.scss'
import Button from '../Button'

interface CTASectionProps {
    rsvpTitle?: string
    rsvpDescription?: string
    rsvpButtonText?: string
    rsvpUrl?: string
    giftTitle?: string
    giftDescription?: string
    giftButtonText?: string
    giftUrl?: string
    className?: string
}

export default function CTASection({
    rsvpTitle = '¿Venís?',
    rsvpDescription = 'Para una mejor organización, es muy importante que nos ayudes confirmando tu asistencia:',
    rsvpButtonText = 'RSVP',
    rsvpUrl = '#',
    giftTitle = '¿Querés regalarnos?',
    giftDescription = 'Haciendo click en el siguiente botón podés ver nuestros elegidos. ¡Gracias!',
    giftButtonText = 'REGALÁ',
    giftUrl = '#',
    className = ''
}: CTASectionProps) {
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
                <h2 className="inv-cta__title">{rsvpTitle}</h2>
                <p className="inv-cta__description">{rsvpDescription}</p>
                <Button href={rsvpUrl} variant="primary">
                    {rsvpButtonText}
                </Button>
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
                <Button href={giftUrl} variant="primary">
                    {giftButtonText}
                </Button>
            </motion.div>
        </section>
    )
}
