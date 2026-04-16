import {MONGO_URI} from "./env.config.js"
import mongoose from "mongoose"
    
export const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("MongoDB Connected Successfully")
    } catch (error) {
        mongoose.disconnect()
        console.error(`DB Error: ${error.message}`)
        throw error
    }
}
