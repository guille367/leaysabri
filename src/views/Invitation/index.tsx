import { RefObject, useState } from 'react'
import './styles/index.scss'
import HeroSection from './components/HeroSection'
import IntroSection from './components/IntroSection'
import TimelineCarousel from './components/TimelineCarousel'
import EventsSection from './components/EventsSection'
import MapSection from './components/MapSection'
import CTASection from './components/CTASection'
import RSVPModal from './components/RSVPModal'
import Footer from './components/Footer'

interface Guest {
    id: string
    name: string
    guests: string[]
    guestsAmount: number
    dietaryRestrictions: string
    code: string
    confirmado: boolean
    createdAt: string
    updatedAt: string
}

interface InvitationProps {
    guest?: Guest | null
    code?: string
    heroRef: RefObject<HTMLDivElement>
    containerRef: RefObject<HTMLDivElement>
}

// ============================================
// CUSTOMIZABLE CONTENT - Edit these values
// ============================================

const COUPLE_NAMES = 'Lean & Sabri'

const HERO_CONTENT: {
    headline: string
    subheadline: string
    backgroundImage?: string
} = {
    headline: '¡Nos Casamos!',
    subheadline: 'Y queremos compartir este día tan especial con vos',
    backgroundImage: 'retrait.jpg',
}

const EVENT =
{
    type: 'ceremony' as const,
    title: 'CELEBRACIÓN',
    date: 'Sábado 18 de Abril 2026',
    time: '18:00 hs.',
    venue: 'Janos Hudson (Uno)',
    address: 'AU BS - LA PLATA, km 34,5, B1885 Guillermo Enrique Hudson',
    locationUrl: 'https://www.google.com/maps/place/Janos+Hudson/@-34.8086462,-58.1741004,16.09z/data=!4m6!3m5!1s0x95a327f694931af9:0x44f6d41ea1d0e890!8m2!3d-34.8083419!4d-58.1704559!16s%2Fg%2F11spp52n8z?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoASAFQAw%3D%3D',
}


const CTA = {
    rsvpTitle: '¿Venís?',
    rsvpDescription: 'Nos encantaría que vengan y agradecemos mucho que nos confirmen su asistencia:',
    rsvpButtonText: 'Confirmar',
    rsvpUrl: '#',
    giftTitle: '¿Querés hacernos un regalo?',
    giftDescription: 'Su presencia es nuestro mejor regalo, pero si desean regalarnos algo, agradeceríamos tu contribución para nuestra luna de miel',
    giftButtonText: 'Ver datos bancarios',
}

const BANKING_DATA = {
    bankName: 'Banco Galicia',
    accountHolder: 'SIMON SABRINA SOLEDAD',
    pesos: {
        accountType: 'Caja de ahorro en pesos',
        alias: 'boda.leanysabri',
    },
    dolares: {
        accountType: 'Caja de ahorro en dólares',
        alias: 'boda.leanysabri.usd',
    },
}

const FOOTER = {
    message: 'Gracias por ser parte de este día tan especial',
    instagramUrl: 'https://instagram.com/boda.leanysabri',
    whatsappNumber: '+5491125173423',
}

const TIMELINE_PHOTOS = [
    { src: '/2014.JPG', alt: 'Nuestra historia', year: 2014 },
    { src: '/2014(1).jpg', alt: 'Nuestra historia', year: 2014 },
    { src: '/2014(2).jpg', alt: 'Nuestra historia', year: 2014 },
    { src: '/2015.jpg', alt: 'Nuestra historia', year: 2015 },
    { src: '/2015(1).jpg', alt: 'Nuestra historia', year: 2015 },
    { src: '/2015(2).jpg', alt: 'Nuestra historia', year: 2015 },
    { src: '/2016.jpg', alt: 'Nuestra historia', year: 2016 },
    { src: '/2016(1).jpg', alt: 'Nuestra historia', year: 2016 },
    { src: '/2016(2).jpg', alt: 'Nuestra historia', year: 2016 },
    { src: '/2017.jpg', alt: 'Nuestra historia', year: 2017 },
    { src: '/2017(1).jpg', alt: 'Nuestra historia', year: 2017 },
    { src: '/2017(2).jpg', alt: 'Nuestra historia', year: 2017 },
    { src: '/2018.jpg', alt: 'Nuestra historia', year: 2018 },
    { src: '/2018(1).jpg', alt: 'Nuestra historia', year: 2018 },
    { src: '/2018(2).jpg', alt: 'Nuestra historia', year: 2018 },
    { src: '/2019.jpg', alt: 'Nuestra historia', year: 2019 },
    { src: '/2019(1).jpg', alt: 'Nuestra historia', year: 2019 },
    { src: '/2019(2).jpg', alt: 'Nuestra historia', year: 2019 },
    { src: '/2020.jpg', alt: 'Nuestra historia', year: 2020 },
    { src: '/2020(1).jpg', alt: 'Nuestra historia', year: 2020 },
    { src: '/2020(2).jpg', alt: 'Nuestra historia', year: 2020 },
    { src: '/2021.jpg', alt: 'Nuestra historia', year: 2021 },
    { src: '/2021(1).jpg', alt: 'Nuestra historia', year: 2021 },
    { src: '/2021(2).jpg', alt: 'Nuestra historia', year: 2021 },
    { src: '/2022(2).jpg', alt: 'Nuestra historia', year: 2022 },
    { src: '/2022.jpg', alt: 'Nuestra historia', year: 2022 },
    { src: '/2022(1).jpg', alt: 'Nuestra historia', year: 2022 },
    { src: '/2023.jpg', alt: 'Nuestra historia', year: 2023 },
    { src: '/2023(1).jpg', alt: 'Nuestra historia', year: 2023 },
    { src: '/2023(2).jpg', alt: 'Nuestra historia', year: 2023 },
    { src: '/2024.jpg', alt: 'Nuestra historia', year: 2024 },
    { src: '/2024(1).jpg', alt: 'Nuestra historia', year: 2024 },
    { src: '/2024(2).jpg', alt: 'Nuestra historia', year: 2024 },
    { src: '/2025.jpg', alt: 'Nuestra historia', year: 2025 },
    { src: '/2025(1).jpg', alt: 'Nuestra historia', year: 2025 },
    { src: '/2026.jpg', alt: 'Nuestra historia', year: 2026 },
]

// ============================================
// PAGE COMPONENT
// ============================================

export default function Invitation({ guest, code, heroRef, containerRef }: InvitationProps) {
    const [rsvpModalOpen, setRsvpModalOpen] = useState(false)
    const [isConfirmed, setIsConfirmed] = useState(guest?.confirmado || false)

    // Personalize subheadline if guest name is available
    const personalizedSubheadline = guest?.name
        ? `${guest.name}, queremos compartir este día tan especial con vos`
        : HERO_CONTENT.subheadline

    return (
        <main className="inv-page">
            <HeroSection
                heroRef={heroRef}
                containerRef={containerRef}
                coupleNames={COUPLE_NAMES}
                headline={HERO_CONTENT.headline}
                subheadline={personalizedSubheadline}
                backgroundImage={HERO_CONTENT.backgroundImage}
            />

            <IntroSection />

            <EventsSection event={EVENT} />

            <MapSection locationQuery="Janos Hudson" />

            <CTASection
                guestName={guest?.name}
                guestsAmount={guest?.guestsAmount}
                isConfirmed={isConfirmed}
                rsvpTitle={CTA.rsvpTitle}
                rsvpDescription={CTA.rsvpDescription}
                rsvpButtonText={CTA.rsvpButtonText}
                onRSVPClick={() => setRsvpModalOpen(true)}
                giftTitle={CTA.giftTitle}
                giftDescription={CTA.giftDescription}
                giftButtonText={CTA.giftButtonText}
                bankingData={BANKING_DATA}
            />


            <TimelineCarousel title="Nuestra historia" photos={TIMELINE_PHOTOS} startYear={2014} endYear={2026} />

            <Footer
                coupleNames={COUPLE_NAMES}
                message={FOOTER.message}
                instagramUrl={FOOTER.instagramUrl}
                whatsappNumber={FOOTER.whatsappNumber}
            />

            <RSVPModal
                isOpen={rsvpModalOpen}
                onClose={() => setRsvpModalOpen(false)}
                guest={guest}
                code={code}
                onConfirmed={() => setIsConfirmed(true)}
            />
        </main>
    )
}
