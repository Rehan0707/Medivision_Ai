import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('medivision');

        const scans = await db.collection('scans')
            .find({})
            .sort({ timestamp: -1 })
            .toArray();

        return NextResponse.json(scans);
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { status: 'Error', message: 'Failed to fetch scans' },
            { status: 500 }
        );
    }
}
