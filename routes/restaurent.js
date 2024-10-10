import express from "express";
import {  restaurentCollection, restaurentFavoriteCollection, restaurentReviewsCollection } from "../db.js";

const router = express.Router();

router.get('/', async(req,  res)=>{
    const result = await restaurentCollection.find().toArray()
    res.send(result)
}) 
router.post('/', async(req,  res)=>{
    const restaurant = req.body
   const result = await restaurentCollection.insertOne(restaurant)
    res.send(result)
}) 

router.get('/restReviews/:title', async(req,  res)=>{
    const name = req.params.title
   
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