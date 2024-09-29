import express from "express";
import { menuCollection } from "../db.js";

const router = express.Router();

router.get('/', async(req,  res)=>{
    const result = await menuCollection.find().toArray()
    res.send(result)
})

export default router;