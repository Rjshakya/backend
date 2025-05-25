import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { userrouter } from "./routes/user.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from 'express-rate-limit'
import path from "path";
import { expressMiddleware } from "@as-integrations/express5";


import { crudrouter } from "./routes/crud.js";
import { createGraphQlServer } from "./services/graphql/config/index.js";

const app = express();
const PORT = process.env.PORT || 4000;
const mongoDB_Cloud = String(process.env.MONGO_URL);

// process.env.FRONTEND_URL

async function init() {

  mongoose
    .connect(mongoDB_Cloud, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`mongoDB connected`))
    .catch((err) => console.log(`mongoDB failed to connect`, err));

  // middlewares



  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: "cross-origin" },
      contentSecurityPolicy: process.env.NODE_ENV !== "production"
    })
  );
  app.use(cors({ origin: [process.env.FRONTEND_URL, "https://studio.apollographql.com"], credentials: true }));

  app.use(express.static(path.resolve("./public")));
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());




  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 200,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: 'Too many requests please wait for 15 minutes'
  })


  app.use(limiter)

  app.use("/graphql", expressMiddleware(await createGraphQlServer()))
  app.use("/user", userrouter)
  app.use("/api", crudrouter)


  app.listen(PORT, (err) => console.log(`Server listening at ${PORT}`));

}

init()

