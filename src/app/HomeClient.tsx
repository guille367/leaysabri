'use client'

import WeddingEnvelope from '@/views/Home/components/WeddingEnvelope'
import SoundPlayer from '@/components/SoundPlayer'

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

interface HomeClientProps {
    guest: Guest | null
    code?: string
}

export default function HomeClient({ guest, code }: HomeClientProps) {
    return (
        <div>
            <SoundPlayer />
            <WeddingEnvelope guest={guest} code={code} />
        </div>
    )
}
