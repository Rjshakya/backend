import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { userrouter } from "./routes/user.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import path from "path";

import { crudrouter } from "./routes/crud.js";

const app = express();
const PORT = process.env.PORT || 5000;
const mongoDB_Cloud = String(process.env.MONGO_CLOUD_URL);

mongoose
  .connect(mongoDB_Cloud)
  .then(() => console.log(`mongoDB connected`))
  .catch((err) => console.log(`mongoDB failed to connect` , err))

// middlewares

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.static(path.resolve("./public")));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userrouter);
app.use("/api", crudrouter);

app.listen(PORT, (err) => console.log(`Server listening at ${PORT}`));
