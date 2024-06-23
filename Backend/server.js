import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from './routes/foodroute.js';
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import 'dotenv/config'
import orderRouter from  './routes/orderRoute.js'
import contactRouter from "./routes/contactRoutes.js";

// app config
const app = express();
const port = process.env.PORT || 8000;

// middlewares 
app.use(express.json()); // Invoke express.json() correctly
app.use(cors({
    origin: "*"
}));

// DB connect
connectDB();

// api endpoints
app.use("/api/food", foodRouter);

// to accesee the images as public to use it on frontend
app.use('/images' , express.static('public/uploads'))


// New routes for users 
app.use('/api/user' , userRouter);


// for cart items 
app.use('/api/cart' , cartRouter);

// For orders 
app.use('/api/order', orderRouter)


// contact api 
app.use('/api/contact' , contactRouter)


// server start
app.listen(port, () => {
    console.log(`Server Running On http://localhost:${port}`);
});
