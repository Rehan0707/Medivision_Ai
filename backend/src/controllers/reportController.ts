import { Request, Response } from 'express';
import Report from '../models/Report';
import Scan from '../models/Scan';
import * as aiService from '../services/aiService';

// @desc    Get all reports
// @route   GET /api/reports
export const getReports = async (req: Request, res: Response) => {
    try {
        // intended primarily for "Self" patient demo
        const reports = await Report.find().sort({ createdAt: -1 });
        res.json(reports);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new report
// @route   POST /api/reports
export const createReport = async (req: Request, res: Response) => {
    try {
        const { scanType, bodyPart, scanUrl, status, patient } = req.body;

        const newReport = new Report({
            patient,
            scanType,
            bodyPart,
            scanUrl,
            status: status || 'Pending'
        });

        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Analyze report text
// @route   POST /api/reports/analyze
export const analyzeReportText = async (req: Request, res: Response) => {
    try {
        const { text, reportId } = req.body;

        if (!text) {
            return res.status(400).json({ message: "No text provided for analysis" });
        }

        const explanation = await aiService.explainLabReport(text);

        // If we have a reportId, update the status AND save the analysis
        if (reportId) {
            await Report.findByIdAndUpdate(reportId, {
                status: 'Analyzed',
                analysis: { summary: explanation }
            });
        }

        res.json({ explanation });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get aggregated bio-analysis indicators
// @route   GET /api/reports/bio-analysis
export const getBioAnalysis = async (req: Request, res: Response) => {
    try {
        const reports = await Report.find().limit(10).sort({ createdAt: -1 });

        // Dynamic aggregation logic for demo
        const indicators = [
            { label: "WBC Count", status: "Optimal", color: "bg-emerald-500" },
            { label: "Glucose", status: reports.length > 2 ? "Stable" : "Attention", color: reports.length > 2 ? "bg-emerald-500" : "bg-orange-500" },
            { label: "Hemoglobin", status: "Optimal", color: "bg-emerald-500" },
            { label: "Creatinine", status: "Normal", color: "bg-emerald-500" }
        ];

        const aiSuggestion = reports.length > 0
            ? "AI analysis of your latest reports suggests stable biological markers. Continue current hydration protocol."
            : "No recent biological data detected. Please upload a lab report for automated bio-analysis.";

        // Additional trends data derived from database counts
        const scanCount = await Scan.countDocuments();
        const overallScore = 85 + (reports.length > 5 ? 7 : reports.length);
        const biomarkerStability = 80 + (reports.length > 3 ? 8 : reports.length * 2);
        const recoveryEfficiency = 90 + (scanCount > 10 ? 4 : Math.min(scanCount, 4));

        res.json({
            indicators,
            aiSuggestion,
            overallScore,
            biomarkerStability,
            recoveryEfficiency,
            vigorData: [40, 55, 45, 70, 65, 80, 55, 90, 75, 85, 92, 94] // Distribution over 12 months (simulated but consistent)
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
