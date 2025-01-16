import express from  'express'
import  dotenv  from 'dotenv';
import userRoutes from './Routes/userRoutes.js'
import authRoutes from './Routes/authRoutes.js'
import adminRoutes from './Routes/adminRoutes.js'
import songRoutes from './Routes/songRoutes.js'
import albumRoutes from './Routes/albumRoutes.js'
import statsRoutes from './Routes/statsRoutes.js'
import connectDB from './lib/db.js';
import { clerkMiddleware } from '@clerk/express'
import path from 'path';
import fileUpload from 'express-fileupload';
import cors from 'cors'
import { createServer } from 'http';
import { initializeSocket } from './lib/socket.js';

dotenv.config();

const __dirname = path.resolve();


const PORT = process.env.PORT;




const app = express();
const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
    }
));

app.use(express.json());
app.use(clerkMiddleware());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB max size
    }
}));
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/stats', statsRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message });
})













httpServer.listen(PORT || 5000, () => {
    console.log("Server is running on port "+ PORT);
    connectDB();
})