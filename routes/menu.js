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

router.patch("/quantity", async(req,res)=>{
    
   const query = {title : req.body?.title}
    const update = {
        $set : {
            quantity : req.body.quantity
        }
    }
   const result = await menuCartsCollection.updateOne(query,update)
   console.log(result);
   res.send(result)
})

router.delete('/:id', async(req,  res)=>{
    const id = req.params.id
    const objectId = new ObjectId(id);
    const query = { _id : objectId }
    const result = await menuCartsCollection.deleteOne(query)
    res.send(result)
})
router.get('/', async(req,  res)=>{
    const result = await menuCollection.find().toArray()
    res.send(result)
})

router.post('/add-menu',async(req,res) => {
    const menu = req.body
    const result = await menuCollection.insertOne(menu)
    res.send(result)
})

router.delete('/delete-menu/:id',async(req,res) => {
 const id = req.params.id
 const objectId = new ObjectId(id)
 const query = { _id : objectId}
 const result = await menuCollection.deleteOne(query)
 res.send(result)
})


export default router;