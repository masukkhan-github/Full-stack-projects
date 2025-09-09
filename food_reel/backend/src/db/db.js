import mongoose, { connect } from 'mongoose';

export const connectDB = async ()=> {
  await  mongoose.connect("mongodb+srv://masukkhan:MasukKhan1985@food.4wfr6cv.mongodb.net/?retryWrites=true&w=majority&appName=food")
   .then(()=>{
    console.log("MongoDB connected");
   })
   .catch((err)=>{
    console.log("MongoDB connection error : ", err);
   });
}