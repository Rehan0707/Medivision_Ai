const mongoose = require('mongoose');
const dotenv = require('dotenv');

const path = require('path');
dotenv.config({ path: path.join(__dirname, 'backend', '.env') });
dotenv.config();

const DiscussionSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    category: String,
    commentsCount: Number,
    activeDoctors: Number,
    timestamp: { type: Date, default: Date.now }
});

const Discussion = mongoose.models.Discussion || mongoose.model('Discussion', DiscussionSchema);

const discussions = [
    {
        title: "Neural mapping of sub-voxel fractures in geriatric patients",
        author: "Dr. Elena Vance",
        content: "I'm observing a higher false-positive rate in osteoporotic bone. Anyone else noticed this in the 4.2 kernel?",
        category: "Trauma Reconstruction",
        commentsCount: 48,
        activeDoctors: 32
    },
    {
        title: "Advancements in MRI-guided robotic neurosurgery",
        author: "Dr. Aris Thorne",
        content: "The latest precision metrics for the T-800 robotic arm show a 15% improvement in sub-millimeter tissue targeting.",
        category: "Neuro-Visual Board",
        commentsCount: 124,
        activeDoctors: 15
    },
    {
        title: "Clinical validation of transformer-based pathology models",
        author: "Prof. Sarah Chen",
        content: "Are we seeing consistent F1 scores across diverse demographic datasets for the new skin lesion model?",
        category: "AI Research Hub",
        commentsCount: 210,
        activeDoctors: 85
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/medivision');
        console.log('Connected to MongoDB');

        await Discussion.deleteMany({});
        await Discussion.insertMany(discussions);

        console.log('Community Discussions Seeded Successfully');
        process.exit();
    } catch (err) {
        console.error('Seeding Failed:', err);
        process.exit(1);
    }
}

seed();
