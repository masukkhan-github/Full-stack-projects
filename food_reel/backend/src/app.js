import express from 'express';
import cookieParser from 'cookie-parser';
import { router } from './routes/auth.routes.js';
import dotenv from 'dotenv'

const app = express();

dotenv.config();

app.use(cookieParser());
app.use(express.json());


app.get("/",(req,res)=>{
  res.send("hello get root");
});

app.use("/api/v1/auth", router)



export default app;

