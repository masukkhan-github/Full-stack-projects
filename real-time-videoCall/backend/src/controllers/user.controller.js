import {User} from '../models/user.model.js';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req,res)=>{
    const { name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(httpStatus.BAD_REQUEST).json({message:"all fields are mandatory"});
    }

    try {
        const existingUser = await User.findOne({email});

        if (existingUser){
            return res.status(httpStatus.FOUND).json({message:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(httpStatus.CREATED).json({message:"User register successfully"});

    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong", error });
    }
}

export const login = async (req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(httpStatus.BAD_REQUEST).json({message:"please provide all credentials"});
    }

    try {
        const oldUser = await User.findOne({email});
        if(oldUser && (await bcrypt.compare(password, oldUser.password))){
            const accessToken = jwt.sign(
                {
                    user:{
                        email: oldUser.email,
                        id: oldUser._id
                    },
                },
                process.env.JWT_SECRET,
                {expiresIn: "1h"}
            )

            res.status(httpStatus.OK).json({accessToken})
        };

    } catch (error) {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).json("login error",error);
    }
}