import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI);

    mongoose.connection.on("connected", () => {
        console.log("Mongoose is connected");
    });

    mongoose.connection.on("error", (err) => {
        console.log(err);
    });
    };


export default connectDB