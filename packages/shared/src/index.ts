export interface MedicalScan {
    _id?: string;
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
}

export interface RehabSession {
    _id?: string;
    patientId: string;
    exerciseName: string;
    completed: boolean;
    date: Date;
    performance: number; // Percentage
}
