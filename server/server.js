import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import userRoutes from "./routes/userRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import productRputes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger("tiny"));
connectDB();

app.use("/api/user", userRoutes);
app.use("/seller", sellerRoutes);
app.use("/product", productRputes);

app.get("/", (req, res) => res.send("server is live"));

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
