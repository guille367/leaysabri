import { google } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

function getAuth() {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || '{}')

    return new google.auth.GoogleAuth({
        credentials,
        scopes: SCOPES,
    })
}

async function getSheets() {
    const auth = await getAuth()
    return google.sheets({ version: 'v4', auth })
}

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || ''
const SHEET_NAME = 'Invitados'

export interface Guest {
    id: string
    name: string
    email: string
    phone: string
    attending: 'yes' | 'no' | 'pending'
    guests: number
    dietaryRestrictions: string
    message: string
    code: string
    createdAt: string
    updatedAt: string
}

export async function getGuests(): Promise<Guest[]> {
    const sheets = await getSheets()

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A2:K`,
    })

    const rows = response.data.values || []

    return rows.map((row) => ({
        id: row[0] || '',
        name: row[1] || '',
        email: row[2] || '',
        phone: row[3] || '',
        attending: (row[4] as Guest['attending']) || 'pending',
        guests: parseInt(row[5]) || 1,
        dietaryRestrictions: row[6] || '',
        message: row[7] || '',
        code: row[8] || '',
        createdAt: row[9] || '',
        updatedAt: row[10] || '',
    }))
}

export async function addGuest(guest: Omit<Guest, 'id' | 'createdAt' | 'updatedAt'>): Promise<Guest> {
    const sheets = await getSheets()
    const id = `guest_${Date.now()}`
    const now = new Date().toISOString()

    const newGuest: Guest = {
        ...guest,
        id,
        createdAt: now,
        updatedAt: now,
    }

    await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:K`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [[
                newGuest.id,
                newGuest.name,
                newGuest.email,
                newGuest.phone,
                newGuest.attending,
                newGuest.guests,
                newGuest.dietaryRestrictions,
                newGuest.message,
                newGuest.code,
                newGuest.createdAt,
                newGuest.updatedAt,
            ]],
        },
    })

    return newGuest
}

export async function updateGuest(id: string, updates: Partial<Guest>): Promise<Guest | null> {
    const sheets = await getSheets()
    const guests = await getGuests()

    const guestIndex = guests.findIndex(g => g.id === id)
    if (guestIndex === -1) return null

    const updatedGuest: Guest = {
        ...guests[guestIndex],
        ...updates,
        id,
        updatedAt: new Date().toISOString(),
    }

    const rowNumber = guestIndex + 2

    await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A${rowNumber}:K${rowNumber}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [[
                updatedGuest.id,
                updatedGuest.name,
                updatedGuest.email,
                updatedGuest.phone,
                updatedGuest.attending,
                updatedGuest.guests,
                updatedGuest.dietaryRestrictions,
                updatedGuest.message,
                updatedGuest.code,
                updatedGuest.createdAt,
                updatedGuest.updatedAt,
            ]],
        },
    })

    return updatedGuest
}

export async function deleteGuest(id: string): Promise<boolean> {
    const sheets = await getSheets()
    const guests = await getGuests()

    const guestIndex = guests.findIndex(g => g.id === id)
    if (guestIndex === -1) return false

    const rowNumber = guestIndex + 2

    const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
    })

    const sheet = spreadsheet.data.sheets?.find(s => s.properties?.title === SHEET_NAME)
    const sheetId = sheet?.properties?.sheetId

    if (sheetId === undefined) return false

    await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
            requests: [{
                deleteDimension: {
                    range: {
                        sheetId,
                        dimension: 'ROWS',
                        startIndex: rowNumber - 1,
                        endIndex: rowNumber,
                    },
                },
            }],
        },
    })

    return true
}

export async function getGuestByCode(code: string): Promise<Guest | null> {
    const guests = await getGuests()
    return guests.find(g => g.code === code) || null
}
