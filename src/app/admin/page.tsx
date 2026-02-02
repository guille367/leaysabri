
export const dynamic = 'force-dynamic'; // Esto desactiva el cacheo estático de esta ruta

import { getGuests } from '@/lib/dynamodb';
import Admin from '@/views/Admin'


export default async function AdminPage() {


        const initialGuests = await getGuests();
    return <Admin initialGuests={initialGuests}/>
}
