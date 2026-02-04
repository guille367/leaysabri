import { motion } from 'framer-motion'
import './styles.scss'
import { CrystalBall, PartyIcon } from '../Icons'

interface Event {
    title: string
    date: string
    time: string
    venue: string
    address: string
    locationUrl?: string
}

interface EventsSectionProps {
    event: Event
    className?: string
}

export default function EventsSection({
    event,
    className = ''
}: EventsSectionProps) {
    return (
        <section className={`inv-events ${className}`}>
            <motion.div
                className="inv-events__card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
            >
                <div className="inv-events__event">
                    <div className="inv-events__icons">
                        <div className="inv-events__event-icon">
                            <CrystalBall />
                        </div>
                        <div className="inv-events__event-icon">
                            <PartyIcon />
                        </div>
                    </div>
                    <div className="inv-events__event-content">
                        <h3 className="inv-events__event-title">{event.title}</h3>
                        <p className="inv-events__event-datetime">
                            {event.date}<br />
                            {event.time}
                        </p>
                        <p className="inv-events__event-venue">{event.venue}</p>
                        {event.locationUrl ? (
                            <a
                                href={event.locationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inv-events__event-address"
                            >
                                {event.address}
                            </a>
                        ) : (
                            <p className="inv-events__event-address">{event.address}</p>
                        )}
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
