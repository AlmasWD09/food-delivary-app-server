import express from "express";
import { userCollection } from "../db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// we can get total users data s

router.get("/", async (req, res) => {
  const results = await userCollection.find().toArray();
  res.send(results);
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    console.log(body);
    const query = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        role: body.role,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,
      },
    };
    const result = await userCollection.updateOne(query, updateDoc);
    res.status(200).send("user succesfully updated");
  } catch (error) {
    res.status(404).send("something went wrong");
  }
});

export default router;
