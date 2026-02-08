import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('medivision');

        // Check connection by pinging the database
        await db.command({ ping: 1 });

        return NextResponse.json({
            status: 'Connected',
            message: 'Successfully connected to MongoDB localhost:27017'
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { status: 'Error', message: 'Failed to connect to MongoDB' },
            { status: 500 }
        );
    }
}
