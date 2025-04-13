import express from "express";
import {
  handleRefreshToken,
  handleUserLogin,
  handleUserLogout,
  handleUserRegistration,
} from "../controllers/user.js";

const userrouter = express.Router();

userrouter.post("/register", handleUserRegistration);
userrouter.post("/login", handleUserLogin);
userrouter.post("/logout", handleUserLogout);
userrouter.get("/refreshToken", handleRefreshToken);

// userrouter.post('/' , (req , res) => {
//   req.headers.authorization
// })

// crud operations

export { userrouter };
