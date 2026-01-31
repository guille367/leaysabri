import { motion } from 'framer-motion'
import './styles.scss'
import EventCard from '../EventCard'
import SectionTitle from '../SectionTitle'
import { ChurchIcon, PartyIcon } from '../Icons'

interface Event {
    type: 'ceremony' | 'party'
    title: string
    date: string
    time: string
    location: string
    locationUrl?: string
}

interface EventsSectionProps {
    title?: string
    subtitle?: string
    events: Event[]
    className?: string
}

export default function EventsSection({
    title = 'Ceremonia & Fiesta',
    subtitle,
    events,
    className = ''
}: EventsSectionProps) {
    const getIcon = (type: 'ceremony' | 'party') => {
        return type === 'ceremony' ? <ChurchIcon /> : <PartyIcon />
    }

    return (
        <section className={`inv-events ${className}`}>
            <div className="inv-events__container">
                <SectionTitle title={title} subtitle={subtitle} />

                <div className="inv-events__grid">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                        >
                            <EventCard
                                icon={getIcon(event.type)}
                                title={event.title}
                                date={event.date}
                                time={event.time}
                                location={event.location}
                                locationUrl={event.locationUrl}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
