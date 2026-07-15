import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));

app.use(express.json());

// --- IMPORT ROUTES ---
import userRouter from './routes/user.routes.js';

// --- DECLARE ROUTES ---
// This says: "Any request starting with /api/v1/users goes to the userRouter"
app.use('/api/v1/users', userRouter);

export { app };