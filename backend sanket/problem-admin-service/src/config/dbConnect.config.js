import mongoose from "mongoose";
import SERVER_CONFIG from "./server.config.js";

export async function dbConnect() {
    try {
        if(SERVER_CONFIG.NODE_ENV === 'development') {
            await mongoose.connect(SERVER_CONFIG.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("Database connected successfully");
        }
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}