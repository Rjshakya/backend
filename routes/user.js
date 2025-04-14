import express from "express";
import {
  handleRefreshToken,
  handleUserLogin,
  handleUserLogout,
  handleUserRegistration,
} from "../controllers/user.js";
import { googleRegistration } from "../controllers/google.auth.js";

const userrouter = express.Router();

userrouter.post("/register", handleUserRegistration);
userrouter.post("/login", handleUserLogin);
userrouter.post("/logout", handleUserLogout);
userrouter.get("/refreshToken", handleRefreshToken);

userrouter.post("/auth/google", googleRegistration);


export { userrouter };
