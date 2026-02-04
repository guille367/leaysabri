import { motion } from 'framer-motion'
import './styles.scss'
import { HeartIcon, ArrowUpIcon, InstagramIcon, WhatsAppIcon } from '../Icons'

interface FooterProps {
    coupleNames: string
    message?: string
    instagramUrl?: string
    whatsappNumber?: string
    showScrollTop?: boolean
    className?: string
}

export default function Footer({
    coupleNames,
    message = 'Gracias por ser parte de este día tan especial',
    instagramUrl,
    whatsappNumber,
    showScrollTop = false,
    className = ''
}: FooterProps) {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const whatsappUrl = whatsappNumber
        ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`
        : undefined

    return (
        <footer className={`inv-footer ${className}`}>
            <div className="inv-footer__container">
                <motion.div
                    className="inv-footer__content"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="inv-footer__message">{message}</p>

                    <div className="inv-footer__names">
                        <HeartIcon className="inv-footer__heart" />
                        <span>{coupleNames}</span>
                        <HeartIcon className="inv-footer__heart" />
                    </div>

                    <div className="inv-footer__social">
                        {instagramUrl && (
                            <a
                                href={instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inv-footer__social-link"
                                aria-label="Instagram"
                            >
                                <InstagramIcon />
                            </a>
                        )}
                        {whatsappUrl && (
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inv-footer__social-link"
                                aria-label="WhatsApp"
                            >
                                <WhatsAppIcon />
                            </a>
                        )}
                    </div>
                </motion.div>

                {showScrollTop && (
                    <button
                        className="inv-footer__scroll-top"
                        onClick={scrollToTop}
                        aria-label="Volver arriba"
                    >
                        <ArrowUpIcon />
                    </button>
                )}

            </div>
        </footer>
    )
}
