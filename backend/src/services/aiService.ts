import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const analyzeMedicalImage = async (imageBuffer: Buffer, mimeType: string) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `Analyze this medical scan image. Provide detailed findings, suspected body part, confidence level (0-1), and health recommendations. Return as JSON.
      Format: { "findings": ["..."], "recommendations": ["..."], "confidence": 0.9, "bodyPart": "..." }`;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: imageBuffer.toString('base64'),
                    mimeType
                }
            }
        ]);

        const response = await result.response;
        const text = response.text();

        // Attempt to parse JSON from the response text
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        return { error: 'Failed to parse AI response', raw: text };
    } catch (error: any) {
        console.error('AI Analysis Error:', error);
        throw new Error('AI Analysis failed: ' + error.message);
    }
};

export const explainLabReport = async (text: string) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `Explain this lab report in plain English for a patient. Highlight any abnormalities and provide gentle suggestions.
      Lab Report Text: ${text}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error: any) {
        console.error('AI Lab Explanation Error:', error);
        throw new Error('Lab explanation failed: ' + error.message);
    }
};
