import express from "express";
import { userCollection } from "../db.js";


const router = express.Router();


// Route to get all users (excluding their passwords)
router.get('/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const query = { emailAddress: email }
        const result = await userCollection.findOne(query)
        res.send(result)
    }
    catch (error) {
        return res.json({
            message: "user not found"
        })
    }
});


export default router;
