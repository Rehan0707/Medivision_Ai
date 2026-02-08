import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db('medivision');

        const newScan = {
            ...body,
            timestamp: new Date(),
            encrypted: true,
            status: 'Active'
        };

        const result = await db.collection('scans').insertOne(newScan);

        return NextResponse.json({
            status: 'Success',
            id: result.insertedId
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { status: 'Error', message: 'Failed to save scan' },
            { status: 500 }
        );
    }
}
