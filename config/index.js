import dotenv from 'dotenv';

dotenv.config();

export const {
    PORT, DB_CONN, TINY_KEY, JWT_SECRET, REFRESH_SECRET, DEBUG_MODE,
} = process.env;
