import { Request, Response } from 'express';
import * as aiService from '../services/aiService';
import { getChannel } from '../config/rabbitmq';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

// @desc    Analyze medical image
// @route   POST /api/ai/analyze
// @access  Public
export const analyzeImage = async (req: Request, res: Response) => {
    try {
        const { image, imageBase64, mimeType, modality, prompt } = req.body;
        const imageInput = image || imageBase64;

        if (!imageInput) {
            return res.status(400).json({ message: 'No image provided' });
        }

        let buffer: Buffer;
        let resolvedMime = mimeType || 'image/jpeg';

        // Handle data URL (data:image/png;base64,...)
        if (typeof imageInput === 'string' && imageInput.startsWith('data:')) {
            const matches = imageInput.match(/^data:([^;]+);base64,(.+)$/);
            if (matches) {
                resolvedMime = matches[1];
                buffer = Buffer.from(matches[2], 'base64');
            } else {
                return res.status(400).json({ message: 'Invalid data URL format' });
            }
        }
        // Handle URL path - fetch from frontend
        else if (typeof imageInput === 'string' && (imageInput.startsWith('/') || imageInput.startsWith('http'))) {
            try {
                const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
                const url = imageInput.startsWith('http') ? imageInput : `${baseUrl}${imageInput}`;
                const resp = await fetch(url);
                if (!resp.ok) throw new Error('Fetch failed');
                const arrayBuffer = await resp.arrayBuffer();
                buffer = Buffer.from(arrayBuffer);
                resolvedMime = resp.headers.get('content-type') || 'image/png';
            } catch (fetchErr: any) {
                return res.status(400).json({
                    message: 'Could not fetch image from URL. Please upload the image file directly.',
                    hint: 'Use a file upload to get base64 data.'
                });
            }
        }
        // Raw base64 string
        else if (typeof imageInput === 'string') {
            buffer = Buffer.from(imageInput, 'base64');
        } else {
            return res.status(400).json({ message: 'Invalid image format' });
        }

        const result = await aiService.analyzeMedicalImage(buffer, resolvedMime, modality, prompt);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Explain lab report text
// @route   POST /api/ai/explain-report
// @access  Public
export const explainReport = async (req: Request, res: Response) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'No text provided' });
        }

        const explanation = await aiService.explainLabReport(text);
        res.json({ explanation });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const getHealthNews = async (req: Request, res: Response) => {
    res.json([]);
};

export const synthesizeNote = async (req: Request, res: Response) => {
    try {
        const { scanData, role } = req.body;
        const note = await aiService.synthesizeClinicalNote(scanData || {}, role || 'patient');
        res.json({ text: note });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Analyze ECG using RabbitMQ Worker
// @route   POST /api/ai/analyze-ecg-async
// @access  Public
export const analyzeECGAsync = async (req: Request, res: Response) => {
    try {
        const { ecgData, samplingRate } = req.body;
        const jobId = uuidv4();
        const channel = getChannel();

        if (channel) {
            const message = {
                jobId,
                timestamp: new Date(),
                fileType: 'csv',
                metadata: { samplingRate }
            };
            channel.sendToQueue('ecg_analysis_queue', Buffer.from(JSON.stringify(message)), { persistent: true });
        } else {
            console.warn("RabbitMQ unavailable. Simulating Async Job...");
            // Simulate processing delay and write result
            setTimeout(() => {
                const jobsDir = path.join(__dirname, '../../data/jobs');
                if (!fs.existsSync(jobsDir)) fs.mkdirSync(jobsDir, { recursive: true });

                fs.writeFileSync(path.join(jobsDir, `${jobId}.json`), JSON.stringify({
                    jobId,
                    status: 'Completed',
                    result: {
                        rhythm: "Normal Sinus Rhythm (Simulated)",
                        findings: ["RabbitMQ Offline - Using Mock Data", "Kaggle Dataset: Normal"],
                        summary: "System simulated analysis of Kaggle ECG dataset due to missing broker.",
                        confidence: 0.99
                    },
                    completedAt: new Date()
                }));
            }, 3000);
        }

        res.status(202).json({
            message: 'ECG Analysis job queued',
            jobId,
            status: 'Processing',
            checkStatusUrl: `/api/ai/job-status/${jobId}`
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Check ECG Analysis job status
// @route   GET /api/ai/job-status/:jobId
// @access  Public
export const getJobStatus = async (req: Request, res: Response) => {
    try {
        const { jobId } = req.params;
        const resultPath = path.join(__dirname, '../../data/jobs', `${jobId}.json`);

        if (fs.existsSync(resultPath)) {
            const data = fs.readFileSync(resultPath, 'utf8');
            return res.json(JSON.parse(data));
        }

        res.json({ jobId, status: 'Processing' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
