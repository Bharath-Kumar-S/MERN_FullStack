import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { allowedOrigins } from "./config/allowedOrigins.js";
import { logger } from "./middleware/logger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(logger);

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) callback(null, true);
      else callback(new Error("Not allowed by CORS"));
    },
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

app.listen(PORT, async () => {
  console.log("app is started");
  mongoose.connect(process.env.DBSTRING);
  const db = mongoose.connection;
  db.on("error", (error) => console.error(error));
  db.on("open", () => console.log("Connected to DB!!!!"));
});

app.get("/", (req,res) => {
    res.json({message: ''}).status(200);
});
