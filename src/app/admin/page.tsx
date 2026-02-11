import type { Metadata } from 'next'
import { getGuests } from '@/lib/dynamodb';
import Admin from '@/views/Admin'

export const dynamic = 'force-dynamic'; // Esto desactiva el cacheo estático de esta ruta

export const metadata: Metadata = {
    title: 'Admin - Lean & Sabri',
    description: 'Panel de administración de invitados',
    robots: {
        index: false,
        follow: false,
    }
}


export default async function AdminPage() {


        const initialGuests = await getGuests();
    return <Admin initialGuests={initialGuests}/>
}
