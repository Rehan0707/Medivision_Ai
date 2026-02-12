import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

// Middleware to protect routes
const protect = async (req: any, res: any, next: any) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
            // Super-admin bypass (no DB record)
            if (decoded.id === 'super-admin-id') {
                req.user = { id: 'super-admin-id', name: 'Super Admin', role: 'Admin' };
                return next();
            }
            const user = await User.findById(decoded.id).select('-password');
            if (!user) return res.status(401).json({ message: 'User not found' });
            req.user = user;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;
