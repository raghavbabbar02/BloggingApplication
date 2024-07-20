import mongoose, { Schema } from 'mongoose';

const refreshTokenSchema = new Schema({
    token: {
        type: String,
        unique: true,
    },
}, { timestamps: false });

export default mongoose.model('RefreshToken', refreshTokenSchema, 'refreshTokens');
