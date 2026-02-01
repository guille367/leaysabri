import { motion } from 'framer-motion'
import './styles.scss'
import Button from '../Button'
import { HashtagIcon, SpotifyIcon, InstagramIcon } from '../Icons'

interface EngagementSectionProps {
    hashtag?: string
    hashtagDescription?: string
    spotifyUrl?: string
    spotifyDescription?: string
    instagramUrl?: string
    className?: string
}

export default function EngagementSection({
    hashtag,
    hashtagDescription = 'Compartí tus fotos y videos usando nuestro hashtag',
    spotifyUrl,
    spotifyDescription = 'Sugerí canciones para nuestra playlist',
    instagramUrl,
    className = ''
}: EngagementSectionProps) {
    return (
        <section className={`inv-engagement ${className}`}>
            <div className="inv-engagement__container">
                {hashtag && (
                    <motion.div
                        className="inv-engagement__item"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inv-engagement__icon">
                            <HashtagIcon />
                        </div>
                        <h3 className="inv-engagement__hashtag">{hashtag}</h3>
                        <p className="inv-engagement__description">{hashtagDescription}</p>
                        {instagramUrl && (
                            <Button
                                href={instagramUrl}
                                variant="outline"
                                icon={<InstagramIcon />}
                            >
                                Instagram
                            </Button>
                        )}
                    </motion.div>
                )}

                {spotifyUrl && (
                    <motion.div
                        className="inv-engagement__item inv-engagement__item--spotify"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                    >
                        <div className="inv-engagement__icon inv-engagement__icon--spotify">
                            <SpotifyIcon />
                        </div>
                        <p className="inv-engagement__description">{spotifyDescription}</p>
                        <Button
                            href={spotifyUrl}
                            variant="secondary"
                            icon={<SpotifyIcon />}
                        >
                            Abrir Playlist
                        </Button>
                    </motion.div>
                )}
            </div>
        </section>
    )
}
