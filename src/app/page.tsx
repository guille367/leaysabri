import { getGuestByCode } from '@/lib/dynamodb'
import HomeClient from './HomeClient'
import type { Metadata } from 'next'

interface PageProps {
    searchParams: Promise<{ code?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    const params = await searchParams
    const code = params.code

    // Build OG image URL with or without code
    const ogImageUrl = code
        ? `https://bodaleanysabri.com/api/og?code=${code}`
        : 'https://bodaleanysabri.com/api/og'

    // Default metadata
    const defaultMetadata: Metadata = {
        title: 'Lean & Sabri - ¡Nos Casamos!',
        description: '¡Estás invitado/a a celebrar nuestra boda! Acompañanos en este día tan especial.',
        openGraph: {
            title: 'Lean & Sabri - ¡Nos Casamos!',
            description: '¡Estás invitado/a a celebrar nuestra boda! Acompañanos en este día tan especial.',
            images: [{
                url: ogImageUrl,
                width: 1200,
                height: 630,
                alt: 'Lean & Sabri - ¡Nos casamos!'
            }],
            locale: 'es_ES',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Lean & Sabri - ¡Nos Casamos!',
            description: '¡Estás invitado/a a celebrar nuestra boda! Acompañanos en este día tan especial.',
            images: [ogImageUrl],
        }
    }

    // If no code, return default metadata
    if (!code) {
        return defaultMetadata
    }

    // Try to fetch guest by code
    try {
        const guest = await getGuestByCode(code)

        if (guest) {
            const personalizedDescription = `${guest.name}, estás invitado/a a la boda de Lean & Sabri. ¡Esperamos contar con tu presencia en este día tan especial!`

            return {
                title: `${guest.name} - Boda Lean & Sabri`,
                description: personalizedDescription,
                openGraph: {
                    title: `${guest.name} - Boda Lean & Sabri`,
                    description: personalizedDescription,
                    images: [{
                        url: ogImageUrl,
                        width: 1200,
                        height: 630,
                        alt: 'Lean & Sabri - ¡Nos casamos!'
                    }],
                    locale: 'es_ES',
                    type: 'website',
                },
                twitter: {
                    card: 'summary_large_image',
                    title: `${guest.name} - Boda Lean & Sabri`,
                    description: personalizedDescription,
                    images: [ogImageUrl],
                }
            }
        }
    } catch (error) {
        console.error('Error generating metadata:', error)
    }

    // If guest not found or error, return default metadata
    return defaultMetadata
}

export default async function Home({ searchParams }: PageProps) {
    const params = await searchParams
    const code = params.code

    let guest = null
    if (code) {
        try {
            guest = await getGuestByCode(code)
        } catch (error) {
            console.error('Error fetching guest:', error)
        }
    }

    return <HomeClient guest={guest} code={code} />
}
