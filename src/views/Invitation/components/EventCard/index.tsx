import './styles.scss'
import { CalendarIcon, ClockIcon, MapPinIcon } from '../Icons'

interface EventCardProps {
    icon: React.ReactNode
    title: string
    date: string
    time: string
    location: string
    locationUrl?: string
    className?: string
}

export default function EventCard({
    icon,
    title,
    date,
    time,
    location,
    locationUrl,
    className = ''
}: EventCardProps) {
    return (
        <div className={`inv-event-card ${className}`}>
            <div className="inv-event-card__icon">
                {icon}
            </div>
            <h3 className="inv-event-card__title">{title}</h3>

            <div className="inv-event-card__details">
                <div className="inv-event-card__detail">
                    <CalendarIcon className="inv-event-card__detail-icon" />
                    <span>{date}</span>
                </div>
                <div className="inv-event-card__detail">
                    <ClockIcon className="inv-event-card__detail-icon" />
                    <span>{time}</span>
                </div>
                <div className="inv-event-card__detail">
                    <MapPinIcon className="inv-event-card__detail-icon" />
                    {locationUrl ? (
                        <a href={locationUrl} target="_blank" rel="noopener noreferrer" className="inv-event-card__location-link">
                            {location}
                        </a>
                    ) : (
                        <span>{location}</span>
                    )}
                </div>
            </div>
        </div>
    )
}
