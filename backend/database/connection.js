import mongoose from "mongoose";

export const connection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "JOB_PORTAL"
    }).then(()=>{
        console.log("Connected to MongoDB");
    }).catch(err=>{
        console.log(`Error while connecting MongoDB ${err}`);
    })      
}