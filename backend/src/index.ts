import app from './app';
import connectDB from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5001;

// Connect to Database
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 MediVision AI Backend running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
    });
});
