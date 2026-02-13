import { animate, motion } from 'framer-motion'
import './styles.scss'
import { ChevronDownIcon } from '../Icons'

interface ScrollHintProps {
    text?: string
    onClick?: () => void
    variant?: 'light' | 'dark'
    className?: string
}

export default function ScrollHint({
    text = 'Deslizá',
    onClick,
    variant = 'light',
    className = ''
}: ScrollHintProps) {
    const handleClick = () => {
        if (onClick) {
            onClick()
        } else {
            const target = window.scrollY + (window.innerHeight * 2)
            animate(window.scrollY, target, {
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1],
                onUpdate: (v) => window.scrollTo(0, v),
            })
        }
    }

    return (
        <motion.button
            className={`scroll-hint scroll-hint--${variant} ${className}`}
            onClick={handleClick}
            // initial={{ opacity: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{
                opacity: { delay: 1.2, duration: 0.6 },
                y: { delay: 1.5, duration: 1.5, repeat: Infinity }
            }}
        >
            <span>{text}</span>
            <ChevronDownIcon className="scroll-hint__icon" />
        </motion.button>
    )
}
