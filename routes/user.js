import express from "express";
import { userCollection } from "../db.js"
import bcrypt from "bcryptjs";


const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const user = req.body;
        const clientEmail = user.emailAddress;
        const clientPassword = user.password; 

        // Check if the email already exists in MongoDB
        const existingUser = await userCollection.findOne({ emailAddress: clientEmail });

        // If user with the email exists, return a message saying email is already taken
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists. Please use another email." });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(clientPassword, 10);
        user.password = hashedPassword;

     
        await userCollection.insertOne(user);
        return res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
});



router.post('/login', async (req, res) => {
    try {
        const { emailAddress, password } = req.body;
        // Find the user with the provided email
        const user = await userCollection.findOne({ emailAddress });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

       res.send(user)
    }
    catch (error) {
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
})
export default router;
