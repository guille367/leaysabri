import './styles.scss'

interface SectionTitleProps {
    title: string
    subtitle?: string
    centered?: boolean
    className?: string
}

export default function SectionTitle({
    title,
    subtitle,
    centered = true,
    className = ''
}: SectionTitleProps) {
    return (
        <div className={`inv-section-title ${centered ? 'inv-section-title--centered' : ''} ${className}`}>
            <h2 className="inv-section-title__heading">{title}</h2>
            {subtitle && <p className="inv-section-title__subtitle">{subtitle}</p>}
        </div>
    )
}
