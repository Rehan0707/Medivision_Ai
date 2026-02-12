import mongoose from 'mongoose';

const DiscussionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String, // e.g., 'Trauma Reconstruction', 'Neuro-Visual'
        required: true
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    activeDoctors: {
        type: Number,
        default: 1
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model('Discussion', DiscussionSchema);
