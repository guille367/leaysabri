import { animate, motion } from 'framer-motion'
import './styles.scss'
import { ChevronDownIcon } from '../Icons'

interface ScrollHintProps {
    text?: string
    onClick?: () => void
    variant?: 'light' | 'dark'
    className?: string
    animate: boolean
}

export default function ScrollHint({
    text = 'Deslizá',
    onClick,
    variant = 'light',
    className = '',
    animate = false,
}: ScrollHintProps) {
    const handleClick = () => {
        if (onClick) {
            onClick()
        }
    }

    const animationProps = animate ? {
        initial: { opacity: 0 },
        animate: { y: [0, 10, 0] },
        transition: {
            opacity: { delay: 1.2, duration: 0.6 },
            y: { delay: 1.5, duration: 1.5, repeat: Infinity }
        }
    } : {}

    return (
        <motion.button
            className={`scroll-hint scroll-hint--${variant} ${className}`}
            onClick={handleClick}
            {...animationProps}
        >
            <span>{text}</span>
            <ChevronDownIcon className="scroll-hint__icon" />
        </motion.button>
    )
}
