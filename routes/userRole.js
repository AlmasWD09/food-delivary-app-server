import express from "express";
import { userCollection } from "../db.js";

const router = express.Router()

router.get('/:email',async(req, res)=>{
    const email = req.params.email
    const query = {email : email}
    const result = await userCollection.findOne(query)
    res.send(result)
})

export default router;