import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

export const analyzeMedicalImage = async (imageBuffer: Buffer, mimeType: string, modality?: string, customPrompt?: string) => {
    try {
        const geminiKey = process.env.GEMINI_API_KEY;
        const openaiKey = process.env.OPENAI_API_KEY;

        const prompt = customPrompt || `Analyze this medical scan image with clinical sovereignty and 99.9% anatomical precision. 
        You MUST return the result as a strictly valid JSON object. 

        Refrence Strict Anatomy Keys (Selection is Mandatory):
        - "brain": For all Cerebral, Cranial, or Neural MRI/CT scans.
        - "spine": For Cervical, Thoracic (spine-focused), Lumbar, or Sacral vertebrae.
        - "thorax": For Chest X-rays, Lung Parenchyma, Rib cage, or Clavicle scans.
        - "knee": For Patellar, Femoral-Tibial joint, or Meniscal imaging.
        - "hand": For Carpal, Metacarpal, Phalangeal, Wrist, or Finger scans.
        - "bone": For Long bones (Femur, Humerus), Pelvis, or general skeletal fractures not covered above.

        JSON Structure:
        {
            "detectedPart": "string (MUST be one of [brain, spine, thorax, knee, hand, bone])",
            "preciseAbnormality": "string (Specific clinical finding, e.g. 'Spiral Fracture', 'Consolidation', 'Glioma')",
            "preciseLocation": "string (Anatomical coordinate, e.g. 'Distal Radius', 'Right Middle Lobe', 'L4 Vertebra')",
            "findings": ["Detailed clinical observation 1", "Observation 2"],
            "recommendations": ["Protocol recommendation 1"],
            "summary": "1-sentence executive clinical summary",
            "confidence": number (0.00-1.00)
        }`;

        // Try Gemini First
        if (geminiKey && geminiKey !== 'PLACEHOLDER' && geminiKey.length > 10) {
            try {
                const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
                const result = await model.generateContent([
                    prompt,
                    { inlineData: { data: imageBuffer.toString('base64'), mimeType } }
                ]);
                const response = await result.response;
                const text = response.text();
                const jsonMatch = text.match(/\{[\s\S]*\}/);
                if (jsonMatch) return JSON.parse(jsonMatch[0]);
            } catch (err) {
                console.warn('Gemini failed, trying OpenAI...', err);
            }
        }

        // Try OpenAI Fallback
        if (openaiKey && openaiKey.length > 10) {
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a world-class radiologist. Always return JSON." },
                    {
                        role: "user",
                        content: [
                            { type: "text", text: prompt },
                            {
                                type: "image_url",
                                image_url: { url: `data:${mimeType};base64,${imageBuffer.toString('base64')}` }
                            }
                        ]
                    }
                ],
                response_format: { type: "json_object" }
            });
            return JSON.parse(response.choices[0].message.content || '{}');
        }

        throw new Error('AI Analysis Unavailable: No valid API keys found (Gemini/OpenAI).');
    } catch (error: any) {
        console.error('AI Analysis Error:', error);
        throw error;
    }
};

export const generateHealthNews = async (location: string) => {
    // ... logic for news ...
    return []; // Placeholder for now
};

export const synthesizeClinicalNote = async (scanData: any, role: 'doctor' | 'patient') => {
    try {
        const geminiKey = process.env.GEMINI_API_KEY;
        const openaiKey = process.env.OPENAI_API_KEY;
        const prompt = role === 'doctor'
            ? `As a clinical AI assistant, draft a professional medical note for Doctor review. Scan type: ${scanData?.type || 'Unknown'}. Findings: ${(scanData?.analysis?.findings || []).join(', ') || 'None documented'}. Use clinical terminology.`
            : `As a patient care assistant, explain this medical scan in simple, comforting language. Scan: ${scanData?.type || 'Unknown'}. Findings: ${(scanData?.analysis?.findings || []).join(', ') || 'None'}. Use analogies, avoid jargon, be reassuring.`;

        if (geminiKey && geminiKey !== 'PLACEHOLDER' && geminiKey.length > 10) {
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const result = await model.generateContent(prompt);
            return (await result.response).text();
        }
        if (openaiKey && openaiKey.length > 10) {
            const res = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }]
            });
            return res.choices[0]?.message?.content || '';
        }
        throw new Error('No AI API keys configured');
    } catch (err: any) {
        console.error('Synthesize note error:', err);
        throw err;
    }
};

export const explainLabReport = async (text: string) => {
    try {
        const geminiKey = process.env.GEMINI_API_KEY;
        const openaiKey = process.env.OPENAI_API_KEY;

        const prompt = `Explain this lab report in plain English for a patient. Highlight any abnormalities and provide gentle suggestions.
      Lab Report Text: ${text}`;

        if (geminiKey && geminiKey !== 'PLACEHOLDER' && geminiKey.length > 10) {
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        }

        if (openaiKey && openaiKey.length > 10) {
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }]
            });
            return response.choices[0].message.content;
        }

        throw new Error("Clinical Explanation Unavailable: No valid API keys found.");
    } catch (error: any) {
        console.error('AI Lab Explanation Error:', error);
        throw error;
    }
};
