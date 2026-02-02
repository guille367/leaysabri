'use client'

import { useState } from 'react'
import '@/views/Invitation/styles/index.scss'
import HeroSection from '@/views/Invitation/components/HeroSection'
import IntroSection from '@/views/Invitation/components/IntroSection'
import TimelineCarousel from '@/views/Invitation/components/TimelineCarousel'
import EventsSection from '@/views/Invitation/components/EventsSection'
import MapSection from '@/views/Invitation/components/MapSection'
import CTASection from '@/views/Invitation/components/CTASection'
import RSVPModal from '@/views/Invitation/components/RSVPModal'
import Footer from '@/views/Invitation/components/Footer'

interface Guest {
    id: string
    name: string
    guests: string[]
    guestsAmount: number
    dietaryRestrictions: string
    code: string
    createdAt: string
    updatedAt: string
}

interface InvitationClientProps {
    guest: Guest | null
    code?: string
}

const COUPLE_NAMES = 'Lea & Sabri'

const HERO_CONTENT = {
    headline: '¡Nos Casamos!',
    subheadline: 'Y queremos compartir este día tan especial con vos',
    backgroundImage: 'retrait.png',
}

const EVENT = {
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
    rsvpButtonText: 'Confirmar',
    rsvpUrl: '#',
    giftTitle: '¿Querés hacernos un regalo?',
    giftDescription: 'Su presencia es nuestro mejor regalo, pero si desean regalarnos algo, agradeceríamos tu contribución para nuestra luna de miel',
    giftButtonText: 'Ver datos bancarios',
}

const BANKING_DATA = {
    bankName: 'Banco Galicia',
    accountHolder: 'Lea y Sabri',
    accountType: 'Caja de ahorro en pesos',
    cbu: '0070000000000000000000',
    alias: 'LEA.SABRI.BODA',
}

const FOOTER = {
    message: 'Gracias por ser parte de este día tan especial',
    instagramUrl: 'https://instagram.com/leaysabri',
    whatsappNumber: '+5491112345678',
}

const TIMELINE_PHOTOS = [
    { src: '/leaysabri01.jpg', alt: 'Nuestra historia', year: 2013 },
    { src: '/leaysabri02.jpg', alt: 'Nuestra historia', year: 2014 },
    { src: '/leaysabri03.jpg', alt: 'Nuestra historia', year: 2015 },
    { src: '/leaysabri04.jpg', alt: 'Nuestra historia', year: 2016 },
    { src: '/leaysabri05.jpg', alt: 'Nuestra historia', year: 2017 },
    { src: '/leaysabri06.jpg', alt: 'Nuestra historia', year: 2018 },
    { src: '/leaysabri07.jpg', alt: 'Nuestra historia', year: 2019 },
    { src: '/leaysabri08.jpg', alt: 'Nuestra historia', year: 2020 },
    { src: '/leaysabri09.jpg', alt: 'Nuestra historia', year: 2021 },
    { src: '/leaysabri10.jpg', alt: 'Nuestra historia', year: 2022 },
    { src: '/leaysabri11.jpg', alt: 'Nuestra historia', year: 2023 },
    { src: '/leaysabri12.jpg', alt: 'Nuestra historia', year: 2024 },
    { src: '/leaysabri13.jpg', alt: 'Nuestra historia', year: 2025 },
    { src: '/leaysabri14.jpg', alt: 'Nuestra historia', year: 2025 },
    { src: '/leaysabri14.jpg', alt: 'Nuestra historia', year: 2025 },
]

export default function InvitationClient({ guest, code }: InvitationClientProps) {
    const [rsvpModalOpen, setRsvpModalOpen] = useState(false)

    // Personalize subheadline if guest name is available
    const personalizedSubheadline = guest?.name
        ? `${guest.name}, queremos compartir este día tan especial con vos`
        : HERO_CONTENT.subheadline

    return (
        <main className="inv-page">
            <HeroSection
                coupleNames={COUPLE_NAMES}
                headline={HERO_CONTENT.headline}
                subheadline={personalizedSubheadline}
                backgroundImage={HERO_CONTENT.backgroundImage}
            />

            <IntroSection />

            <EventsSection event={EVENT} />

            <CTASection
                rsvpTitle={CTA.rsvpTitle}
                rsvpDescription={CTA.rsvpDescription}
                rsvpButtonText={CTA.rsvpButtonText}
                onRSVPClick={() => setRsvpModalOpen(true)}
                giftTitle={CTA.giftTitle}
                giftDescription={CTA.giftDescription}
                giftButtonText={CTA.giftButtonText}
                bankingData={BANKING_DATA}
            />

            <MapSection locationQuery="Av. Suárez 1698, Buenos Aires, Argentina" />

            <TimelineCarousel title="Nuestra historia" photos={TIMELINE_PHOTOS} startYear={2013} endYear={2025} />

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
            />
        </main>
    )
}
