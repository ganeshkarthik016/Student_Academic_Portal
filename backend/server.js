import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to DB first, then start the server!
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 MVC Server is running on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("❌ MySQL Connection failed! Server stopped.", err);
    });