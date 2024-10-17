import express from "express";
import { userCollection } from "../db.js";

const router = express.Router()


router.put('/update-profile/:email', async(req, res)=>{
    const email = req.params.email;
    const data = req.body;
    const filter = { email: email }
    const updateDoc = {
        $set: {
            ...data
        }
    }
    const result = await userCollection.updateOne(filter, updateDoc);
    res.send(result)
})

router.put('/update-address/:email', async(req, res)=>{
    const email = req.params.email;
    const data = req.body;
    const options = { upsert: true };
    const filter = { email: email }
    const updateDoc = {
        $set: {
            ...data
        }
    }
    const result = await userCollection.updateOne(filter, updateDoc, options);
    res.send(result)
})

router.get('/get-address/:email',async(req, res)=>{
    const email = req.params.email
    const query = {email : email}
    const result = await userCollection.findOne(query)
    res.send(result)
})

export default router;