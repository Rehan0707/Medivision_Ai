import dotenv from 'dotenv';
import path from 'path';
import { connectRabbitMQ } from '../config/rabbitmq';
import { startECGWorker } from '../workers/ecgWorker';

// Load env vars from backend root
dotenv.config({ path: path.join(__dirname, '../../.env') });

const start = async () => {
    try {
        console.log('🚀 Starting ECG Worker Service...');
        await connectRabbitMQ();
        await startECGWorker();
    } catch (error) {
        console.error('❌ Failed to start ECG Worker:', error);
        process.exit(1);
    }
};

start();
