import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema({
    author: { type: String, required: true },
    content: { type: String, required: true },
});

export default mongoose.model('Comment', commentSchema, 'comments');
