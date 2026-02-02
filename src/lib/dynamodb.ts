import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
    DynamoDBDocumentClient,
    ScanCommand,
    PutCommand,
    UpdateCommand,
    DeleteCommand,
} from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({
    region: process.env.AWS_REGION || 'us-east-1',
})

const docClient = DynamoDBDocumentClient.from(client)

const TABLE_NAME = process.env.DYNAMODB_TABLE || 'leaysabri-guests-sandbox'

export interface Guest {
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

export async function getGuests(): Promise<Guest[]> {
    const command = new ScanCommand({
        TableName: TABLE_NAME,
    })

    const response = await docClient.send(command)
    return (response.Items as Guest[]) || []
}

export async function addGuest(
    guest: Omit<Guest, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Guest> {
    const id = `guest_${Date.now()}`
    const now = new Date().toISOString()

    const newGuest: Guest = {
        ...guest,
        id,
        createdAt: now,
        updatedAt: now,
    }

    const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: newGuest,
    })

    await docClient.send(command)
    return newGuest
}

export async function updateGuest(
    id: string,
    updates: Partial<Guest>
): Promise<Guest | null> {
    const now = new Date().toISOString()

    const updateExpressions: string[] = ['#updatedAt = :updatedAt']
    const expressionAttributeNames: Record<string, string> = {
        '#updatedAt': 'updatedAt',
    }
    const expressionAttributeValues: Record<string, unknown> = {
        ':updatedAt': now,
    }

    const allowedFields = ['name', 'guests', 'guestsAmount', 'dietaryRestrictions', 'code', 'confirmado']

    for (const field of allowedFields) {
        if (field in updates) {
            updateExpressions.push(`#${field} = :${field}`)
            expressionAttributeNames[`#${field}`] = field
            expressionAttributeValues[`:${field}`] = updates[field as keyof Guest]
        }
    }

    const command = new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: `SET ${updateExpressions.join(', ')}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
    })

    try {
        const response = await docClient.send(command)
        return response.Attributes as Guest
    } catch {
        return null
    }
}

export async function deleteGuest(id: string, code: string): Promise<boolean> {
    const command = new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { code, id },
    })

    try {
        await docClient.send(command)
        return true
    } catch(error) {
        console.error('Delete error:', error)
        throw error
    }
}

export async function getGuestByCode(code: string): Promise<Guest | null> {
    // Use Scan with filter since code is not the partition key
    const command = new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: '#code = :code',
        ExpressionAttributeNames: {
            '#code': 'code',
        },
        ExpressionAttributeValues: {
            ':code': code,
        },
    })

    try {
        const response = await docClient.send(command)
        if (response.Items && response.Items.length > 0) {
            return response.Items[0] as Guest
        }
        return null
    } catch(error) {
        console.log(error)
        return null
    }
}
