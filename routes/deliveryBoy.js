import express from "express";
import { deliveryManCollection } from "../db.js";

const router = express.Router()
router.post('/', async(req, res) => {
    const item = req.body
    const result = await deliveryManCollection.insertOne(item)
    res.send(result)
})
export default router;