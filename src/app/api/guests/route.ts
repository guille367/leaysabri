import { NextRequest, NextResponse } from 'next/server'
import { getGuests, addGuest, updateGuest, deleteGuest } from '@/lib/sheets'

export async function GET() {
    try {
        const guests = await getGuests()
        return NextResponse.json({ guests })
    } catch (error) {
        console.error('Error fetching guests:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
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
            email: body.email || '',
            phone: body.phone || '',
            attending: body.attending || 'pending',
            guests: body.guests || 1,
            dietaryRestrictions: body.dietaryRestrictions || '',
            message: body.message || '',
            code: body.code || '',
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

        if (!body.id) {
            return NextResponse.json(
                { error: 'Guest ID is required' },
                { status: 400 }
            )
        }

        const deleted = await deleteGuest(body.id)

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
