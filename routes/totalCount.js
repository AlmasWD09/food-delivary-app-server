import express from "express";
import { userCollection } from "../db.js";
import { restaurentCollection } from "../db.js";

const router = express.Router();

// Route to get total number of users
router.get("/danish", async (req, res) => {
  try {
    // Get the total count of documents in the users collection
    const totalUserCount = await userCollection.countDocuments();
    const totalResturentCount = await restaurentCollection.countDocuments();

    // Send the total count as a response
    res.send({
         totalUsers: totalUserCount,
         totalResturant: totalResturentCount,
         });
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Failed to get total user count:", error);
    res.status(500).json({ message: "Server error, failed to get total user count" });
  }
});

export default router;