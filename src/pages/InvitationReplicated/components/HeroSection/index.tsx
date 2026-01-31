import { motion } from 'framer-motion'
import './styles.scss'
import ScrollHint from '../ScrollHint'

interface HeroSectionProps {
    coupleNames: string
    headline: string
    subheadline: string
    backgroundImage?: string
    className?: string
}

export default function HeroSection({
    coupleNames,
    headline,
    subheadline,
    backgroundImage,
    className = ''
}: HeroSectionProps) {
    return (
        <section
            className={`inv-hero ${className}`}
            style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
        >
            <div className="inv-hero__overlay" />

            <motion.div
                className="inv-hero__content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <motion.p
                    className="inv-hero__names"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    {coupleNames}
                </motion.p>

                <motion.h1
                    className="inv-hero__headline"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    {headline}
                </motion.h1>

                <motion.p
                    className="inv-hero__subheadline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    {subheadline}
                </motion.p>
            </motion.div>

            <ScrollHint variant="light" className="inv-hero__scroll-hint" />
        </section>
    )
}
