import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://ShivamY:210160116078@cluster0.jztceom.mongodb.net/food-app").then(()=>{
        console.log("Connected ");
    })
}