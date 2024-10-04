import express from "express";
import { restaurentCollection } from "../db.js";

const router = express.Router();

router.get('/', async(req,  res)=>{
    const result = await restaurentCollection.find().toArray()
    res.send(result)
}) 
export default router