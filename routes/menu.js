import express from "express";
import { menuCartsCollection, menuCollection } from "../db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post('/', async(req, res) => {
    const item = req.body
    const result = await menuCartsCollection.insertOne(item)
    res.send(result)
})

router.get('/:email', async(req,  res)=>{
    const email = req.params.email
    const filter = { userEmail : email }
    const result = await menuCartsCollection.find(filter).toArray()
    res.send(result)
})
router.delete('/:id', async(req,  res)=>{
    const id = req.params.id
    const query = { _id : new ObjectId(id) }
    const result = await menuCartsCollection.deleteOne(query)
    res.send(result)
})
router.get('/', async(req,  res)=>{
    const result = await menuCollection.find().toArray()
    res.send(result)
})

export default router;