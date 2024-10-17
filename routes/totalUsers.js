import express from "express";
import { userCollection } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const results = await userCollection.find().toArray();
  res.send(results);
});

export default router;
