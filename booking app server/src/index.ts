import express from "express";
import cors from 'cors';
import eventRoutes from './routers/router'
import { log } from "console";
import mongoose from 'mongoose';
const app= express();


const PORT = 3000;
app.use(cors());




const mongoURI = 'mongodb://localhost:27017/eventDB';


mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

    
app.listen(PORT,()=>{
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
    
})
app.use(express.json())
app.use('/', eventRoutes);