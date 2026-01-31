import { motion } from 'framer-motion'
import './styles.scss'
import Button from '../Button'
import { GiftIcon, HeartIcon } from '../Icons'

interface CTAItem {
    title: string
    description: string
    buttonText: string
    buttonUrl?: string
    icon?: 'gift' | 'heart'
}

interface CTASectionProps {
    items: CTAItem[]
    className?: string
}

export default function CTASection({
    items,
    className = ''
}: CTASectionProps) {
    const getIcon = (icon?: 'gift' | 'heart') => {
        switch (icon) {
            case 'gift':
                return <GiftIcon />
            case 'heart':
                return <HeartIcon />
            default:
                return null
        }
    }

    return (
        <section className={`inv-cta ${className}`}>
            <div className="inv-cta__container">
                {items.map((item, index) => (
                    <motion.div
                        key={item.title}
                        className="inv-cta__item"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                    >
                        {item.icon && (
                            <div className="inv-cta__icon">
                                {getIcon(item.icon)}
                            </div>
                        )}
                        <h3 className="inv-cta__title">{item.title}</h3>
                        <p className="inv-cta__description">{item.description}</p>
                        <Button href={item.buttonUrl} variant="primary">
                            {item.buttonText}
                        </Button>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
