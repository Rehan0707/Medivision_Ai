import { Request, Response } from 'express';
import * as aiService from '../services/aiService';

// @desc    Analyze medical image
// @route   POST /api/ai/analyze-image
// @access  Public
export const analyzeImage = async (req: Request, res: Response) => {
    try {
        const { imageBase64, mimeType } = req.body;

        if (!imageBase64) {
            return res.status(400).json({ message: 'No image provided' });
        }

        const buffer = Buffer.from(imageBase64, 'base64');
        const result = await aiService.analyzeMedicalImage(buffer, mimeType || 'image/jpeg');

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
