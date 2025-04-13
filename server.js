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
const mongodbURL = String(process.env.MOONGOOSE_URL) || "";

mongoose
  .connect(mongodbURL)
  .then(() => console.log(`monngoDB connected`))
  .catch(() => console.log(`mongoDB failed to connect`));

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
