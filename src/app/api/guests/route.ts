import { NextRequest, NextResponse } from 'next/server'
import { getGuests, addGuest, updateGuest, deleteGuest } from '@/lib/dynamodb'


export async function GET() {
    try {
        const guests = await getGuests()
        return NextResponse.json(
            { guests },
            {
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                },
            }
        )
    } catch (error) {
        console.error('Error fetching guests:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        if (!body.name) {
            return NextResponse.json(
                { error: 'Name is required' },
                { status: 400 }
            )
        }

        const guest = await addGuest({
            name: body.name,
            guests: body.guests || [],
            guestsAmount: body.guestsAmount || 0,
            dietaryRestrictions: body.dietaryRestrictions || '',
            code: body.code || '',
            confirmado: body.confirmado ?? false,
        })

        return NextResponse.json({ guest }, { status: 201 })
    } catch (error) {
        console.error('Error adding guest:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()

        if (!body.id) {
            return NextResponse.json(
                { error: 'Guest ID is required' },
                { status: 400 }
            )
        }

        const guest = await updateGuest(body.id, body)

        if (!guest) {
            return NextResponse.json(
                { error: 'Guest not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ guest })
    } catch (error) {
        console.error('Error updating guest:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json()

        if (!body.id || !body.code) {
            return NextResponse.json(
                { error: 'Guest ID and code are required' },
                { status: 400 }
            )
        }

        const deleted = await deleteGuest(body.id, body.code)

        if (!deleted) {
            return NextResponse.json(
                { error: 'Guest not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting guest:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
