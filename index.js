import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import {corsOptions} from "./config.js";
import {connectDB} from "./db.js"
dotenv.config();


const app = express();
const port = process.env.PORT || 5000

// Middleware
app.use(cors({ origin: corsOptions }));
app.use(express.json());

// Routes


app.get("/",(req, res)=>{
    res.send('Food delivery server running')
})

const run = async() =>{
    await connectDB();
    app.listen(port,()=>{
        console.log(`Food delivery server port : ${port}`);
    })
}

run().catch(console.dir)
