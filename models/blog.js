import mongoose, { Schema } from 'mongoose';

const blogSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0, required: true },
}, { timestamps: true });

export default mongoose.model('Blogs', blogSchema, 'blogs');
