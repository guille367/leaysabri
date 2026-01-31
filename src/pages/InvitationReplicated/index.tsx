import './styles/index.scss'
import HeroSection from './components/HeroSection'
import EventsSection from './components/EventsSection'
import CTASection from './components/CTASection'
import EngagementSection from './components/EngagementSection'
import Footer from './components/Footer'

// ============================================
// CUSTOMIZABLE CONTENT - Edit these values
// ============================================

const COUPLE_NAMES = 'Lea & Sabri'

const HERO_CONTENT: {
    headline: string
    subheadline: string
    backgroundImage?: string
} = {
    headline: '¡Nos Casamos!',
    subheadline: 'Y queremos compartir este día tan especial con vos',
    backgroundImage: 'retrait.png', // Add your photo here
}

const EVENTS = [
    {
        type: 'ceremony' as const,
        title: 'Ceremonia',
        date: 'Sábado 15 de Marzo, 2025',
        time: '17:00 hs',
        location: 'Iglesia San Pedro',
        locationUrl: 'https://maps.google.com/?q=Iglesia+San+Pedro',
    },
    {
        type: 'party' as const,
        title: 'Fiesta',
        date: 'Sábado 15 de Marzo, 2025',
        time: '20:00 hs',
        location: 'Salón de Eventos',
        locationUrl: 'https://maps.google.com/?q=Salon+de+Eventos',
    },
]

const CTA_ITEMS = [
    {
        icon: 'heart' as const,
        title: 'Confirmá tu asistencia',
        description: 'Por favor confirmanos tu presencia antes del 1 de Marzo',
        buttonText: 'Confirmar',
        buttonUrl: '#', // Add your RSVP form URL
    },
    {
        icon: 'gift' as const,
        title: 'Mesa de regalos',
        description: 'Si querés hacernos un regalo, te dejamos algunas ideas',
        buttonText: 'Ver regalos',
        buttonUrl: '#', // Add your gift registry URL
    },
]

const ENGAGEMENT = {
    hashtag: '#LeaYSabri2025',
    hashtagDescription: 'Compartí tus fotos y videos usando nuestro hashtag',
    spotifyUrl: 'https://open.spotify.com/playlist/xxxxx', // Add your playlist URL
    spotifyDescription: 'Sugerí canciones para nuestra playlist',
    instagramUrl: 'https://instagram.com/leaysabri',
}

const FOOTER = {
    message: 'Gracias por ser parte de este día tan especial',
    instagramUrl: 'https://instagram.com/leaysabri',
    whatsappNumber: '+5491112345678', // Add contact number
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function InvitationReplicated() {
    return (
        <main className="inv-page">
            <HeroSection
                coupleNames={COUPLE_NAMES}
                headline={HERO_CONTENT.headline}
                subheadline={HERO_CONTENT.subheadline}
                backgroundImage={HERO_CONTENT.backgroundImage}
            />

            <EventsSection events={EVENTS} />

            <CTASection items={CTA_ITEMS} />

            <EngagementSection
                hashtag={ENGAGEMENT.hashtag}
                hashtagDescription={ENGAGEMENT.hashtagDescription}
                spotifyUrl={ENGAGEMENT.spotifyUrl}
                spotifyDescription={ENGAGEMENT.spotifyDescription}
                instagramUrl={ENGAGEMENT.instagramUrl}
            />

            <Footer
                coupleNames={COUPLE_NAMES}
                message={FOOTER.message}
                instagramUrl={FOOTER.instagramUrl}
                whatsappNumber={FOOTER.whatsappNumber}
            />
        </main>
    )
}
