import { motion } from 'framer-motion'
import './styles.scss'

interface IntroSectionProps {
    title?: string
    subtitle?: string
    className?: string
}

export default function IntroSection({
    title = 'Nuestro Casamiento',
    subtitle = 'Te dejamos toda la información para que nos acompañes en este gran día.',
    className = ''
}: IntroSectionProps) {
    return (
        <section className={`inv-intro ${className}`}>
            <motion.div
                className="inv-intro__content"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="inv-intro__title">{title}</h2>
                <p className="inv-intro__subtitle">{subtitle}</p>
            </motion.div>
        </section>
    )
}
