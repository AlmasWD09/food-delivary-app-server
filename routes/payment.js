import express from "express";
import Stripe from "stripe";
import { menuCartsCollection, paymentsCollection } from "../db.js";
import { ObjectId } from "mongodb";


const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.get("/", async (req, res)=> {
  const result = await paymentsCollection.find().toArray();
  res.send(result);
})

router.get("/respayment", async (req, res) => {
  const filter = { "paymentData.restaurantNames": { $in: ["Spice Paradise"] } };
  const results = await paymentsCollection.find(filter).toArray();
  res.send(results);
});

router.post("/intent",async(req,res)=>{
    const {price} = req.body;
   
    const amount = parseInt(price * 100)
    const paymentIntent = await stripe.paymentIntents.create({
      amount : amount,
      currency : 'usd',
      payment_method_types : ['card']
    })
    res.send({
      clientSecret : paymentIntent.client_secret
    })
  })

router.post("/success", async (req,res) => {
  const payment = req.body
 
  const query = {userEmail : payment.paymentData.userEmail}
 
  const result = await paymentsCollection.insertOne(payment)
  const result2 = await menuCartsCollection.deleteMany(query)
   res.send({result,result2})
})
  




export default router