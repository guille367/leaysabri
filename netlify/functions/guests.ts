import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
import { getGuests, addGuest, updateGuest, deleteGuest } from './utils/sheets'

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
}

const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers, body: '' }
    }

    try {
        // GET - List all guests
        if (event.httpMethod === 'GET') {
            const guests = await getGuests()
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ guests }),
            }
        }

        // POST - Add new guest (RSVP)
        if (event.httpMethod === 'POST') {
            const body = JSON.parse(event.body || '{}')

            if (!body.name) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Name is required' }),
                }
            }

            const guest = await addGuest({
                name: body.name,
                email: body.email || '',
                phone: body.phone || '',
                attending: body.attending || 'pending',
                guests: body.guests || 1,
                dietaryRestrictions: body.dietaryRestrictions || '',
                message: body.message || '',
                code: body.code || '',
            })

            return {
                statusCode: 201,
                headers,
                body: JSON.stringify({ guest }),
            }
        }

        // PUT - Update guest
        if (event.httpMethod === 'PUT') {
            const body = JSON.parse(event.body || '{}')

            if (!body.id) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Guest ID is required' }),
                }
            }

            const guest = await updateGuest(body.id, body)

            if (!guest) {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ error: 'Guest not found' }),
                }
            }

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ guest }),
            }
        }

        // DELETE - Remove guest
        if (event.httpMethod === 'DELETE') {
            const body = JSON.parse(event.body || '{}')

            if (!body.id) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Guest ID is required' }),
                }
            }

            const deleted = await deleteGuest(body.id)

            if (!deleted) {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ error: 'Guest not found' }),
                }
            }

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ success: true }),
            }
        }

        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' }),
        }
    } catch (error) {
        console.error('Error:', error)
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal server error' }),
        }
    }
}

export { handler }
