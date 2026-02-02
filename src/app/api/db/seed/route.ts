import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const seedScans = [
    {
        referenceId: "MV-7721",
        timestamp: new Date("2026-01-29"),
        type: "X-Ray (Distal)",
        patient: "Self",
        status: "Active",
        risk: "Low",
        encrypted: true,
        analysis: {
            confidence: 99.1,
            findings: ["Midline trachea", "Clear costophrenic angles"],
            recommendations: ["Routine follow-up in 2 weeks"]
        }
    },
    {
        referenceId: "MV-6542",
        timestamp: new Date("2026-01-12"),
        type: "MRI Cranial",
        patient: "Self",
        status: "Verified",
        risk: "Safe",
        encrypted: true,
        analysis: {
            confidence: 98.4,
            findings: ["Normal gray-white matter differentiation"],
            recommendations: ["No further intervention required"]
        }
    },
    {
        referenceId: "MV-4410",
        timestamp: new Date("2025-12-05"),
        type: "CT Thorax",
        patient: "Self",
        status: "Archived",
        risk: "Stable",
        encrypted: true,
        analysis: {
            confidence: 97.2,
            findings: ["No nodular opacities"],
            recommendations: ["Annual screening"]
        }
    }
];

export async function POST() {
    try {
        const client = await clientPromise;
        const db = client.db('medivision');

        // Clear existing scans to prevent duplicates for this demo seed
        await db.collection('scans').deleteMany({});

        // Insert new records
        const result = await db.collection('scans').insertMany(seedScans);

        return NextResponse.json({
            status: 'Success',
            message: `Seed complete. Inserted ${result.insertedCount} records.`
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { status: 'Error', message: 'Failed to seed database' },
            { status: 500 }
        );
    }
}
