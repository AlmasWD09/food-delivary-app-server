import express from "express";
import {  restaurentCollection, restaurentFavoriteCollection, restaurentReviewsCollection } from "../db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get('/rest', async (req, res) => {
   
    const result = await restaurentCollection.find().toArray();
    res.send(result);
})

router.get('/', async (req, res) => {
    const search = req.query.search;
    let query = {};
    if (search) {
        query.restaurantName = {
            $regex: search,
            $options: "i"
        };
    }
    const cursor = restaurentCollection.find(query);
    const result = await cursor.toArray();
    res.send({
        restaurents: result
    });
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    // Check if the id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
        return res.status(400).send({ error: 'Invalid restaurant ID' });
    }

    const query = { _id: new ObjectId(id) };
    const result = await restaurentCollection.findOne(query);
    res.send(result);
});

router.post('/', async(req,  res)=>{
    const restaurant = req.body
   const result = await restaurentCollection.insertOne(restaurant)
    res.send(result)
}) 

router.get('/restReviews', async(req,  res)=>{
    const name = req.params.title || "Spice Paradise"
    const filter = {restaurantName : name}
    const result = await restaurentReviewsCollection.find(filter).toArray()
    res.send(result)
}) 

router.post('/restReviews', async(req,  res)=>{
    const review = req.body
    const result = await restaurentReviewsCollection.insertOne(review)
    res.send(result)
}) 

router.get('/restFavorite', async(req,  res)=>{
    const { userName, restaurantName } = req.query;
  
    const filter = {};
    if (userName) filter.userName = userName;  // Ensure correct field in the MongoDB filter
    if (restaurantName) filter.restaurantName = restaurantName;

    const result = await restaurentFavoriteCollection.find(filter).toArray();
    res.send(result);
}) 

router.post('/restFavorite', async(req,  res)=>{
    const favorite = req.body
    const result = await restaurentFavoriteCollection.insertOne(favorite)
    res.send(result)
}) 
export default router