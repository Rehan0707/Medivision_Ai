import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { image, prompt } = body;

        console.log("Gemini Request Prompt:", prompt);

        if (!process.env.GEMINI_API_KEY) {
            console.error("GEMINI_API_KEY is not defined in environment variables");
            return NextResponse.json({ error: "Gemini API Key missing" }, { status: 500 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        let result;
        if (image) {
            console.log("Analyzing image...");
            result = await model.generateContent([
                prompt || "Analyze this medical scan. Identify the primary body part (hand, leg, chest, etc.) and provide a professional summary, key findings, and a patient-friendly explanation.",
                {
                    inlineData: {
                        data: image.split(",")[1],
                        mimeType: "image/png"
                    }
                }
            ]);
        } else {
            console.log("Analyzing text...");
            result = await model.generateContent(prompt);
        }

        const response = await result.response;
        const text = response.text();
        console.log("Gemini Response Text:", text);

        return NextResponse.json({ text });

    } catch (error: any) {
        console.error("Gemini AI Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
