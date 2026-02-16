import amqp from 'amqplib';

let connection: any = null;
let channel: any = null;

export const connectRabbitMQ = async (): Promise<typeof channel> => {
    try {
        const amqpServer = process.env.RABBITMQ_URL || 'amqp://localhost';
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();

        if (channel) {
            await channel.assertQueue('ecg_analysis_queue', { durable: true });
        }

        console.log('✅ Connected to RabbitMQ');
        return channel;
    } catch (error: any) {
        // Only log a simple warning if usage is optional/local
        if (error.code === 'ECONNREFUSED' || error.message.includes('ECONNREFUSED')) {
            console.warn('⚠️ RabbitMQ Connection Failed: Service not running on localhost:5672');
        } else {
            console.error('❌ RabbitMQ Connection Error:', error.message);
        }
        throw new Error('RabbitMQ Unavailable'); // Re-throw simple error so caller knows it failed
    }
};

export const getChannel = () => channel;
