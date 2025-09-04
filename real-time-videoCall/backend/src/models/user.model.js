import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: [true, "Please add the email address"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ],
        unique: [true, "Email already exist"]
    },
    password:{
        type:String,
        required:true
    },
    token :{
        type:String
    }
})

const User = mongoose.model("User",userSchema);
export {User};