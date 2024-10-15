
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1kmrgvs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



// all collection here..
export const userCollection = client.db('foodDB').collection('users')
export const menuCollection = client.db('foodDB').collection('menus')
export const menuCartsCollection = client.db('foodDB').collection('menuCarts')
export const restaurentCollection = client.db('foodDB').collection('restaurents')
export const restaurentReviewsCollection = client.db('foodDB').collection('restaurentReviews')
export const restaurentFavoriteCollection = client.db('foodDB').collection('restaurentFavorite')
export const deliveryManCollection = client.db('foodDB').collection('deliveryHero')


export const connectDB = async () => {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();


        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Successfully Connected to MongoDB!");
    } catch (error) {
        console.error("Failed to Connect to MongoDB", error);
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
};