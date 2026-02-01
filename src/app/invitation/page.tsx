import { getGuestByCode } from '@/lib/sheets'
import InvitationClient from './InvitationClient'

interface PageProps {
    searchParams: Promise<{ code?: string }>
}

export default async function InvitationPage({ searchParams }: PageProps) {
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

    return <InvitationClient guest={guest} code={code} />
}
