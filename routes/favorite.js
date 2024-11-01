import express from "express";
import { restaurentFavoriteCollection } from "../db.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const { userName, restaurantName } = req.body;
    console.log(userName, restaurantName)

    const filter = {};
    if (userName) {filter.userName = userName; 
        if (restaurantName) filter.restaurantName = restaurantName;
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