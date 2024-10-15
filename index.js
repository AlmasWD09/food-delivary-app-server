import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import {corsOptions} from "./config.js";
import {connectDB} from "./db.js"
import usersRoute from "./routes/user.js"
import jwtRoutes from "./routes/jwt.js";
import restaurentRoute from "./routes/restaurent.js";
import menuRoute from "./routes/menu.js";
import totalCountRoute from "./routes/totalCount.js";
dotenv.config();


const app = express();
const port = process.env.PORT || 5000

// Middleware
app.use(cors({ origin: corsOptions }));
app.use(express.json());

// Routes
app.use('/users',usersRoute)
app.use('/jwt',jwtRoutes)
app.use('/restaurents',restaurentRoute)
app.use('/menus',menuRoute)

// total information for (dashboard)
app.use('/', totalCountRoute);

app.get("/",(req, res)=>{
    res.send('Food delivery server running')
})

const run = async() =>{
    await connectDB();
    app.listen(port,()=>{
        console.log(`Food delivery server port : ${port}`);
    })
}

run().catch(console.dir)
