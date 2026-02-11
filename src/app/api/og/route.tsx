import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { getGuestByCode } from '@/lib/dynamodb'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET(request: NextRequest) {
    try {
        const code = request.nextUrl.searchParams.get('code')
        let guestName = ''

        if (code) {
            try {
                const guest = await getGuestByCode(code)
                if (guest) {
                    guestName = guest.name
                }
            } catch (error) {
                console.error('Error fetching guest for OG image:', error)
            }
        }

        // Read the image from the filesystem and convert to base64 data URI
        const imagePath = join(process.cwd(), 'public', 'retrait.jpg')
        const imageBuffer = readFileSync(imagePath)
        const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                    }}
                >
                    {/* Background image */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={base64Image}
                            alt=""
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                width: '100%',
                                height: '100%',
                            }}
                        />
                        {/* Dark overlay for text readability */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            padding: '60px',
                        }}
                    >
                        {guestName && (
                            <div
                                style={{
                                    fontSize: 48,
                                    color: 'white',
                                    fontWeight: 300,
                                    marginBottom: 20,
                                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                                }}
                            >
                                {guestName}
                            </div>
                        )}
                        <div
                            style={{
                                fontSize: guestName ? 56 : 72,
                                color: 'white',
                                fontWeight: 600,
                                marginBottom: 20,
                                textShadow: '0 2px 15px rgba(0,0,0,0.7)',
                                letterSpacing: '0.02em',
                            }}
                        >
                            Lean & Sabri
                        </div>
                        <div
                            style={{
                                fontSize: 42,
                                color: 'white',
                                fontWeight: 300,
                                fontStyle: 'italic',
                                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                            }}
                        >
                            ¡Nos Casamos!
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        )
    } catch (error) {
        console.error('Error generating OG image:', error)
        return new Response('Failed to generate image', { status: 500 })
    }
}
