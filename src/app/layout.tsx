import type { Metadata } from 'next'
import '@/styles/main.scss'


export const metadata: Metadata = {
    title: 'Lean & Sabri - ¡Nos Casamos!',
    description: 'Invitación de casamiento de Lean y Sabri',
    openGraph: {
        title: 'Lean & Sabri - ¡Nos Casamos!',
        description: 'Invitación de casamiento de Lean y Sabri',
        images: [{
            url: 'https://bodaleanysabri.com/api/og',
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
        description: 'Invitación de casamiento de Lean y Sabri',
        images: ['https://bodaleanysabri.com/api/og'],
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Montserrat:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap"
                    rel="stylesheet"
                />
                <meta property="og:image" content="https://bodaleanysabri.com/retraitcompressed.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Boda Lean & Sabri" />
            </head>
            <body>{children}</body>
        </html>
    )
}
