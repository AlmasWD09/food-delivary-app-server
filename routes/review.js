import express from "express";
import { menuReviewsCollection, restaurentReviewsCollection } from "../db.js";

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
router.get('/menuRev', async (req, res) => {
    const title = req.query?.title
    let query = {};
    if (title) {
        query.title = {
            $regex: title,
            $options: "i"
        };
    }
 
    const result = await menuReviewsCollection.find(query).toArray()
    res.send(result)
})
router.post('/menuRev', async (req, res) => {
    const review = req.body
    console.log(review)
    const result = await menuReviewsCollection.insertOne(review)
    res.send(result)
})


export default router