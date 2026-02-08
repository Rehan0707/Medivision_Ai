import mongoose, { Schema, Document } from 'mongoose';

export interface IRehabSession extends Document {
    patientId: string;
    exerciseName: string;
    completed: boolean;
    date: Date;
    performance: number; // Percentage
    feedback?: string;
}

const RehabSchema: Schema = new Schema({
    patientId: { type: String, required: true },
    exerciseName: { type: String, required: true },
    completed: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    performance: { type: Number, min: 0, max: 100 },
    feedback: { type: String },
}, { timestamps: true });

export default mongoose.model<IRehabSession>('RehabSession', RehabSchema);
