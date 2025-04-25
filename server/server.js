import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import userRouter from './routes/userRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
connectDB();

//middleware setup
app.use(cors());
app.use(express.json());

// API EndPoints
app.use('/api/user', userRouter);


app.listen(port, () => {
   console.log(`Server Listening on ${port}`);
});