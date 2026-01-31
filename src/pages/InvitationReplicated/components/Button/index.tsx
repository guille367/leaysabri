import './styles.scss'

interface ButtonProps {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    href?: string
    onClick?: () => void
    icon?: React.ReactNode
    fullWidth?: boolean
    className?: string
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    href,
    onClick,
    icon,
    fullWidth = false,
    className = ''
}: ButtonProps) {
    const classes = `inv-button inv-button--${variant} inv-button--${size} ${fullWidth ? 'inv-button--full' : ''} ${className}`

    if (href) {
        return (
            <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
                {icon && <span className="inv-button__icon">{icon}</span>}
                {children}
            </a>
        )
    }

    return (
        <button className={classes} onClick={onClick}>
            {icon && <span className="inv-button__icon">{icon}</span>}
            {children}
        </button>
    )
}
