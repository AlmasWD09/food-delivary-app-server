import express from "express";
import { restaurentReviewsCollection } from "../db.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const result = await restaurentReviewsCollection.find().toArray()
    res.send(result)
})


router.post('/', async (req, res) => {
    const review = req.body
    const result = await restaurentReviewsCollection.insertOne(review)
    res.send(result)
})


export default router