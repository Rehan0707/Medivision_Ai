import express from 'express';
import { register, login, googleAuth, getPendingDoctors, approveDoctor } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.get('/pending-doctors', getPendingDoctors);
router.post('/approve-doctor', approveDoctor);

export default router;
