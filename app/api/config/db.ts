import mongoose from "mongoose";    
import { configDotenv } from "dotenv";


configDotenv()
async function connectDB(){
    configDotenv()
     
    if (mongoose.connection.readyState==1) {
        return
    }
    try {
        mongoose.connect(process.env.MONGO_URL || 'mongodb+srv://muhidinshemsu3:hpInIu1U0hHJPuAS@cluster0.cd40j.mongodb.net/Ecom')
        console.log(`mongodb connected successfuly`)
        
    } catch (error) {
        console.log(`error connecting to the server: ${error}`)
    }
}


export default connectDB

//'mongodb://localhost:27017/Ecom''