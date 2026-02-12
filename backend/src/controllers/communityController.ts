import { Request, Response } from 'express';
import Discussion from '../models/Discussion';

// @desc    Get all active discussions
// @route   GET /api/community/discussions
export const getDiscussions = async (req: Request, res: Response) => {
    try {
        const discussions = await Discussion.find().sort({ timestamp: -1 });
        res.json(discussions);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new clinical discussion
// @route   POST /api/community/discussions
export const createDiscussion = async (req: Request, res: Response) => {
    try {
        const { title, author, content, category } = req.body;

        const newDiscussion = new Discussion({
            title,
            author,
            content,
            category,
            activeDoctors: Math.floor(Math.random() * 50) + 1 // Simulated for demo
        });

        const savedDiscussion = await newDiscussion.save();
        res.status(201).json(savedDiscussion);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
