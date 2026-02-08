import mongoose, { Schema, Document } from 'mongoose';

export interface IScan extends Document {
    referenceId: string;
    timestamp: Date;
    type: string;
    patient: string;
    status: 'Active' | 'Verified' | 'Archived';
    risk: 'Low' | 'Safe' | 'Stable' | 'High';
    encrypted: boolean;
    analysis: {
        confidence: number;
        findings: string[];
        recommendations: string[];
    };
    imageUrl?: string;
    bodyPart?: string;
}

const ScanSchema: Schema = new Schema({
    referenceId: { type: String, required: true, unique: true },
    timestamp: { type: Date, default: Date.now },
    type: { type: String, required: true },
    patient: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Verified', 'Archived'], default: 'Active' },
    risk: { type: String, enum: ['Low', 'Safe', 'Stable', 'High'], default: 'Safe' },
    encrypted: { type: Boolean, default: true },
    analysis: {
        confidence: { type: Number },
        findings: [{ type: String }],
        recommendations: [{ type: String }],
    },
    imageUrl: { type: String },
    bodyPart: { type: String },
}, { timestamps: true });

export default mongoose.model<IScan>('Scan', ScanSchema);
