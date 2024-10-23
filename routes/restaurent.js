import express from "express";
import { restaurentCollection } from "../db.js";
import { ObjectId } from "mongodb";

const router = express.Router();


router.get('/bannerSearch', async(req,res) => {
    const search = req.query.search;
    let query = {};
    if (search) {
        query.location = {
            $regex: search,
            $options: "i"
        };
    }
    const result = await restaurentCollection.find(query).toArray()
    res.send(result)
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

    // Check if the id is a valid ObjectId and ensure it's used as a string
    if (typeof id !== 'string' || !ObjectId.isValid(id)) {
        return res.status(400).send({ error: 'Invalid restaurant ID' });
    }

    // Convert the string id to ObjectId if it's valid
    const query = { _id: new ObjectId(id) };

    try {
        const result = await restaurentCollection.findOne(query);

        if (!result) {
            return res.status(404).send({ error: 'Restaurant not found' });
        }
        res.send(result);
    } catch (error) {
        console.error('Error fetching restaurant:', error);
        res.status(500).send({ error: 'Internal Server Error find' });
    }
});


router.post('/', async(req,  res)=>{
    const restaurant = req.body
    const result = await restaurentCollection.insertOne(restaurant)
    res.send(result)
})


export default router