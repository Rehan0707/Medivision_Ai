import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const seedScans = [
    {
        referenceId: "MV-8966",
        timestamp: new Date("2026-02-05T09:30:00"),
        type: "HAND Scan",
        patient: "Self",
        status: "Verified",
        risk: "Low",
        encrypted: true,
        analysis: {
            confidence: 99.4,
            findings: ["No cortical disruption identified", "Joint spaces preserved", "Phalangeal alignment symmetric"],
            recommendations: ["Discharge from active monitoring", "Follow up only if pain re-emerges"],
            summary: "Normal metacarpal architecture with high structural integrity."
        }
    },
    {
        referenceId: "MV-1915",
        timestamp: new Date("2026-02-05T11:45:00"),
        type: "HAND Scan",
        patient: "Self",
        status: "Verified",
        risk: "Safe",
        encrypted: true,
        analysis: {
            confidence: 98.2,
            findings: ["Minor soft tissue inflammation", "No bone fractures"],
            recommendations: ["Ice application for 24 hours", "Rest suggested"],
            summary: "Healthy hand scan following minor injury protocol."
        }
    },
    {
        referenceId: "MV-1575",
        timestamp: new Date("2026-02-05T14:20:00"),
        type: "ABDOMEN AND PELVIS Scan",
        patient: "Self",
        status: "Verified",
        risk: "Stable",
        encrypted: true,
        analysis: {
            confidence: 97.5,
            findings: ["Organ morphology within normal limits", "No mass detected"],
            recommendations: ["Routine screening in 12 months"],
            summary: "Optimal abdominal health verified by Synapse-X AI."
        }
    },
    {
        referenceId: "MV-9197",
        timestamp: new Date("2026-02-05T16:10:00"),
        type: "ABDOMEN AND PELVIS Scan",
        patient: "Self",
        status: "Verified",
        risk: "Stable",
        encrypted: true,
        analysis: {
            confidence: 96.8,
            findings: ["Gastrointestinal transit normal", "No signs of torsion"],
            recommendations: ["Stay hydrated", "No clinical action required"],
            summary: "Standard preventative pelvic mapping completed."
        }
    },
    {
        referenceId: "MV-1732",
        timestamp: new Date("2026-02-05T17:50:00"),
        type: "BRAIN Scan",
        patient: "Self",
        status: "Active",
        risk: "Low",
        encrypted: true,
        analysis: {
            confidence: 99.1,
            findings: ["Cerebral cortex symmetry verified", "No acute hemorrhage"],
            recommendations: ["Monitor synaptic latency baseline"],
            summary: "High-fidelity neural architecture scan showing peak stability."
        }
    },
    {
        referenceId: "MV-1225",
        timestamp: new Date("2026-02-05T19:30:00"),
        type: "BRAIN Scan",
        patient: "Self",
        status: "Active",
        risk: "Low",
        encrypted: true,
        analysis: {
            confidence: 98.7,
            findings: ["Ventricular volumes stable", "Gray-white differentiation clear"],
            recommendations: ["Annual neurological roadmap sync"],
            summary: "Long-term neural health trajectory remains optimal."
        }
    },
    {
        referenceId: "MV-7965",
        timestamp: new Date("2026-02-05T21:15:00"),
        type: "BRAIN Scan",
        patient: "Self",
        status: "Active",
        risk: "Stable",
        encrypted: true,
        analysis: {
            confidence: 99.0,
            findings: ["Neural pathways verified", "No lesions detected"],
            recommendations: ["Maintain current cognitive load"],
            summary: "Comprehensive baseline neural survey successful."
        }
    },
    {
        referenceId: "MV-5239",
        timestamp: new Date("2026-02-05T22:40:00"),
        type: "BRAIN Scan",
        patient: "Self",
        status: "Verified",
        risk: "Safe",
        encrypted: true,
        analysis: {
            confidence: 98.4,
            findings: ["Synaptic density within 98th percentile", "Optimal vascularity"],
            recommendations: ["Continue neuro-protective habits"],
            summary: "Peak performance brain scan recorded."
        }
    },
    {
        referenceId: "MV-3341",
        timestamp: new Date("2026-02-04T08:20:00"),
        type: "Thoracic CT",
        patient: "Self",
        status: "Archived",
        risk: "Safe",
        encrypted: true,
        analysis: {
            confidence: 97.9,
            findings: ["Lungs clear", "Normal cardiac silhouette"],
            recommendations: ["Biannual screening suggested"],
            summary: "Chest and lung mapping shows no abnormalities."
        }
    },
    {
        referenceId: "MV-2109",
        timestamp: new Date("2026-02-03T15:00:00"),
        type: "Cardiac PET",
        patient: "Self",
        status: "Archived",
        risk: "Normal",
        encrypted: true,
        analysis: {
            confidence: 99.2,
            findings: ["Myocardial perfusion optimal", "No ischemic signs"],
            recommendations: ["Maintain cardio-vascular regimen"],
            summary: "Highly efficient heart function verified via metabolic mapping."
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
