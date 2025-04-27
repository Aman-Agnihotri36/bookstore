import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

let initialized = false;
const Mongouri = process.env.DATABASE
console.log('mongouri', Mongouri)



if (!Mongouri) {
    throw new Error('MongoDB URI is not defined in the environment variables.');
}



export const MongoDbConnect = async () => {


    if (initialized) {
        console.log('MongoDB already connected')
        return
    }

    try {
        await mongoose.connect(Mongouri)

        console.log('Mongo db Connected')
        initialized = true
    } catch (error) {
        console.log('MongoDb connection errro', error)
    }
}