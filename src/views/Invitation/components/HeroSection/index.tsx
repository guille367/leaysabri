import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import './styles.scss'
import { RefObject, useState } from 'react'
import ScrollHint from '../ScrollHint'

interface HeroSectionProps {
    coupleNames: string
    headline: string
    subheadline: string
    backgroundImage?: string
    className?: string
    heroRef: RefObject<HTMLDivElement>
    containerRef: RefObject<HTMLDivElement>
}

export default function HeroSection({
    coupleNames,
    headline,
    subheadline,
    backgroundImage,
    className = '',
    heroRef,
    containerRef,
}: HeroSectionProps) {
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [hasRevealed, setHasRevealed] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (value) => {
        if (value >= 0.79 && !hasRevealed) {
            setHasRevealed(true);
        }
    });

    return (
        <section
            ref={heroRef}
            className={`inv-hero ${className}`}
            style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
        >
            <div className="inv-hero__overlay" />

            <div className="inv-hero__content">
                <motion.p
                    className="inv-hero__names"
                    initial={{ opacity: 0 }}
                    animate={hasRevealed ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    {coupleNames}
                </motion.p>

                <motion.h1
                    className="inv-hero__headline"
                    initial={{ opacity: 0, y: 20 }}
                    animate={hasRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    {headline}
                </motion.h1>

                <motion.p
                    className="inv-hero__subheadline"
                    initial={{ opacity: 0 }}
                    animate={hasRevealed ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    {subheadline}
                </motion.p>
            </div>

            {hasRevealed && <ScrollHint className='scroll-hint--slide' text="Deslizá" />}
        </section>
    )
}
