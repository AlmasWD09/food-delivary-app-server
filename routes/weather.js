import express from "express";
import { weatherMenusCollection } from "../db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  const results = await weatherMenusCollection.find().toArray();
  res.send(results);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id
    const objectId = new ObjectId(id);
    const query = { _id : objectId }
  const results = await weatherMenusCollection.findOne(query);
  res.send(results);
});

export default router;