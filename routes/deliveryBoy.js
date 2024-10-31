import express from "express";
import { deliveryManCollection, userCollection } from "../db.js";
import { ObjectId } from "mongodb";

const router = express.Router()

router.get('/', async(req,res) => {
    const result = await deliveryManCollection.find().toArray()
    res.send(result)
})
router.post('/', async(req, res) => {
    const item = req.body
    const result = await deliveryManCollection.insertOne(item)
    res.send(result)
})

router.patch("/status", async(req,res)=>{
    const email = req.body?.email
    const query = { email : email}
    const update = {
        $set : {
            status : "accepted"
        }
    }
    const update2 = {
        $set : {
            role : "rider"
        }
    }
   const result = await deliveryManCollection.updateOne(query,update)
   const result2 = await userCollection.updateOne(query,update2)
  
   res.send({result,result2})
})

router.delete('/:id', async(req,res)=> {
    const id = req.params.id
   
    const objectId = new ObjectId(id);
    const query = { _id : objectId }
   
    const result = await deliveryManCollection.deleteOne(query)
    res.send(result)
})
export default router;