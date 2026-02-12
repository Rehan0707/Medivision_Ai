import app from './app';
import connectDB from './config/db';
import { connectRabbitMQ } from './config/rabbitmq';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5001;

// Connect to Database (required) and RabbitMQ (optional)
const startServer = async () => {
    try {
        await connectDB();
        try {
            await connectRabbitMQ();
        } catch (rmqErr) {
            console.warn('⚠️ RabbitMQ unavailable (ECG async features disabled). Using mock mode.');
        }

        app.listen(PORT, () => {
            console.log(`🚀 MediVision AI Backend running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Server Startup failed:', error);
    }
};

startServer();
