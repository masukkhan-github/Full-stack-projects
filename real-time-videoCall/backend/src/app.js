import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";

import cors from "cors";

import dotenv from "dotenv";
import { connectToSocket } from "./controllers/socketManager.js";
dotenv.config();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port",(process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended:"true"}));

app.get("/home", (req, res) => {
  res.json({ "name": "masuk" });
});

const start = async () => {

    const connectDB =  await mongoose.connect(process.env.DB_URI)
    console.log(`mongoDB connected DB name ${connectDB.connection.name}`);
  server.listen(app.get("port"), () => {
    console.log(`app is listening on port ${app.get("port")}`);
  });
};

start();
