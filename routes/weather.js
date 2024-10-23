import express from "express";
import { weatherMenusCollection } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const results = await weatherMenusCollection.find().toArray();
  res.send(results);
});

export default router;