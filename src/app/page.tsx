import { getGuestByCode } from '@/lib/dynamodb'
import HomeClient from './HomeClient'

interface PageProps {
    searchParams: Promise<{ code?: string }>
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
