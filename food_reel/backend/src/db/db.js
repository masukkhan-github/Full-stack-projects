import mongoose, { connect } from 'mongoose';

export const connectDB = async ()=> {
  await  mongoose.connect(process.env.DB_URI)
   .then(()=>{
    console.log("MongoDB connected");
   })
   .catch((err)=>{
    console.log("MongoDB connection error : ", err);
   });
}