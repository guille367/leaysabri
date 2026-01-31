import './styles/index.scss'
import HeroSection from './components/HeroSection'
import IntroSection from './components/IntroSection'
import EventsSection from './components/EventsSection'
import CTASection from './components/CTASection'
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

const EVENT = 
    {
        type: 'ceremony' as const,
        title: 'CEREMONIA & FIESTA',
        date: 'sábado 13 de septiembre 2025',
        time: '16:00 hs.',
        venue: 'Schoenstatt Los Olmos',
        address: 'Schoenstatt Los Olmos Pilar, Buenos Aires Province, Argentina',
        locationUrl: 'https://maps.google.com/?q=Schoenstatt+Los+Olmos+Pilar',
    }


const CTA = {
    rsvpTitle: '¿Venís?',
    rsvpDescription: 'Nos encantaría que vengan y agradecemos mucho que nos confirmen su asistencia:',
    rsvpButtonText: 'RSVP',
    rsvpUrl: '#',
    giftTitle: '¿Querés hacernos un regalo?',
    giftDescription: 'Su presencia es nuestro mejor regalo, pero si desean regalarnos algo, agradeceríamos tu contribución para nuestra luna de miel',
    giftButtonText: 'Ver datos bancarios',
    giftUrl: '#',
}

// const ENGAGEMENT = {
//     hashtag: '#LeaYSabri2025',
//     hashtagDescription: 'Compartí tus fotos y videos usando nuestro hashtag',
//     spotifyUrl: 'https://open.spotify.com/playlist/xxxxx', // Add your playlist URL
//     spotifyDescription: 'Sugerí canciones para nuestra playlist',
//     instagramUrl: 'https://instagram.com/leaysabri',
// }

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

            <IntroSection />

            <EventsSection event={EVENT} />

            <CTASection
                rsvpTitle={CTA.rsvpTitle}
                rsvpDescription={CTA.rsvpDescription}
                rsvpButtonText={CTA.rsvpButtonText}
                rsvpUrl={CTA.rsvpUrl}
                giftTitle={CTA.giftTitle}
                giftDescription={CTA.giftDescription}
                giftButtonText={CTA.giftButtonText}
                giftUrl={CTA.giftUrl}
            />

            {/* <EngagementSection
                hashtag={ENGAGEMENT.hashtag}
                hashtagDescription={ENGAGEMENT.hashtagDescription}
                spotifyUrl={ENGAGEMENT.spotifyUrl}
                spotifyDescription={ENGAGEMENT.spotifyDescription}
                instagramUrl={ENGAGEMENT.instagramUrl}
            /> */}

            <Footer
                coupleNames={COUPLE_NAMES}
                message={FOOTER.message}
                instagramUrl={FOOTER.instagramUrl}
                whatsappNumber={FOOTER.whatsappNumber}
            />
        </main>
    )
}
