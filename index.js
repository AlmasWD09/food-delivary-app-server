import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { corsOptions } from "./config.js";
import { connectDB } from "./db.js";
import jwtRoutes from "./routes/jwt.js";
import restaurentRoute from "./routes/restaurent.js";
import menuRoute from "./routes/menu.js";
import totalCountRoute from "./routes/totalCount.js";
import deliveryRoute from "./routes/deliveryBoy.js";
import userProfileRoute from "./routes/userProfile.js";
import paymentRoute from "./routes/payment.js";
import reviewRoute from "./routes/review.js";
import favoriteRoute from "./routes/favorite.js";
import totalUsers from "./routes/totalUsers.js";
import weatherRoute from "./routes/weather.js";
import userRoleRoute from "./routes/userRole.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: corsOptions }));
app.use(express.json());

// Routes

app.use("/jwt", jwtRoutes);
app.use("/restaurents", restaurentRoute);
app.use("/single-menu", menuRoute);
app.use("/cart-menu", menuRoute);
app.use("/cart-menu-delete", menuRoute);
app.use("/menus", menuRoute);
app.use("/delivery-man", deliveryRoute);
app.use("/user-profile", userProfileRoute);
app.use("/payment", paymentRoute);
app.use("/reviews", reviewRoute);
app.use("/favorite", favoriteRoute);
app.use("/users", totalUsers);
app.use("/weatherMenus", weatherRoute);
app.use("/user-role", userRoleRoute);

app.use("/", totalCountRoute);

app.get("/", (req, res) => {
  res.send("Food delivery server running");
});

const run = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Food delivery server port : ${port}`);
  });
};

run().catch(console.dir);
