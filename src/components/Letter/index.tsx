import './styles.scss'

// ============================================
// CUSTOMIZABLE CONTENT - Edit these values
// ============================================

const COUPLE_NAMES = 'Lea & Sabeeeeri'
const WEDDING_DATE = '15 de Marzo, 2025'

const HEADLINE = '¡Nos Casamos!'
const SUBHEADLINE = 'Y queremos compartir este día tan especial con vos'

// ============================================
// LETTER COMPONENT
// ============================================

function Letter() {
    return (
        <div className="invitation-letter">
            {/* Header */}
            <header className="letter-header">
                <p className="letter-names">{COUPLE_NAMES}</p>
                <h1 className="letter-headline">{HEADLINE}</h1>
                <p className="letter-subheadline">{SUBHEADLINE}</p>
                <p className="letter-date">{WEDDING_DATE}</p>
            </header>
        </div>
    )
}

export default Letter
