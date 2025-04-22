import mongoose from "mongoose";    
import { configDotenv } from "dotenv";


configDotenv()
async function connectDB(){
    if (mongoose.connection.readyState==1) {
        return
    }
    try {
        mongoose.connect('mongodb://localhost:27017/Ecom')
        console.log(`mongodb connected successfuly`)
        
    } catch (error) {
        console.log(`error connecting to the server: ${error}`)
    }
}


export default connectDB