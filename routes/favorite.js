import express from "express";
import { restaurentFavoriteCollection } from "../db.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const { userEmail, restaurantName } = req.query;
    console.log(userEmail,restaurantName)
    const filter = {};

    // Only add userEmail to the filter if it's provided
    if (userEmail) {
      filter.userEmail = userEmail;
    }
    
    // Only add restaurantName to the filter if it's provided
    if (restaurantName) {
      filter.restaurantName = restaurantName;
    }
   
    const result = await restaurentFavoriteCollection.find(filter).toArray();
    res.send(result);
})

router.post('/', async (req, res) => {
    const favorite = req.body
    const result = await restaurentFavoriteCollection.insertOne(favorite)
    res.send(result)
})


export default router