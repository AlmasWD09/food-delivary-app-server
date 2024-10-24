import express from "express";
import {
  restaurentCollection,
  restaurentFavoriteCollection,
  restaurentReviewsCollection,
} from "../db.js";
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
  })

router.get("/rest", async (req, res) => {
  const result = await restaurentCollection.find().toArray();
  res.send(result);
});


router.get("/", async (req, res) => {
  const search = req.query.search;
  let query = {};
  if (search) {
    query.restaurantName = {
      $regex: search,
      $options: "i",
    };
  }
  const cursor = restaurentCollection.find(query);
  const result = await cursor.toArray();
  res.send({
    restaurents: result,
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  // Check if the id is a valid ObjectId
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ error: "Invalid restaurant ID" });
  }

  const query = { _id: new ObjectId(id) };
  const result = await restaurentCollection.findOne(query);
  res.send(result);
});

router.post("/", async (req, res) => {
  const restaurant = req.body;
  const result = await restaurentCollection.insertOne(restaurant);
  res.send(result);
});

router.get("/restReviews", async (req, res) => {
  const name = req.params.title || "Spice Paradise";
  const filter = { restaurantName: name };
  const result = await restaurentReviewsCollection.find(filter).toArray();
  console.log(result);
  res.send(result);
});

router.post("/restReviews", async (req, res) => {
  const review = req.body;
  const result = await restaurentReviewsCollection.insertOne(review);
  res.send(result);
});

router.get("/restFavorite", async (req, res) => {
  const { userName, restaurantName } = req.query;

  const filter = {};
  if (userName) filter.userName = userName; // Ensure correct field in the MongoDB filter
  if (restaurantName) filter.restaurantName = restaurantName;

  const result = await restaurentFavoriteCollection.find(filter).toArray();
  res.send(result);
});

router.post("/restFavorite", async (req, res) => {
  const favorite = req.body;
  const result = await restaurentFavoriteCollection.insertOne(favorite);
  res.send(result);
});
export default router;

