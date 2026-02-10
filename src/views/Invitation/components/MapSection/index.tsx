import { motion } from 'framer-motion'
import './styles.scss'

interface MapSectionProps {
    locationUrl?: string
    locationQuery?: string
    className?: string
}

export default function MapSection({
    locationQuery = 'Janos Hudson',
    className = ''
}: MapSectionProps) {
    const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(locationQuery)}&output=embed`

    return (
        <section className={`inv-map ${className}`}>
            <motion.div
                className="inv-map__container"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
            >
                <iframe
                    className="inv-map__iframe"
                    src={embedUrl}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación del evento"
                />
            </motion.div>
        </section>
    )
}
