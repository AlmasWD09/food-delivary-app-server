import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// jwt
router.post("/", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "1h" });
  res.send({ token });
});

export default router;
