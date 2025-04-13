import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import { createToken, verifyToken } from "../services/authentication.js";

// register
const handleUserRegistration = async (req, res) => {
  console.log(req?.body);

  const { name, email, password } = req?.body;

  try {
    if (!name || !email || !password) {
      throw new Error("All field required");
    }

    const isuserExist = await User.findOne({ email: email });

    if (isuserExist) {
      return res.status(400).json({
        success: false,
        msg: "User already exist please login",
        redirect: "/login",
      });
    }

    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });

    if (!user) {
      return res.status(500).json({
        success: false,
        msg: "failed to register user",
      });
    }

    const { accessToken, refreshToken } = createToken(user);
    if (accessToken.length < 1 && refreshToken.length < 1) {
      return res.status(500).json({
        success: false,
        msg: "Failed to generate token",
      });
    }

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        domain: "localhost",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        msg: "user registration and login Success",
        user: { id: user.id, name: user.name, email: user.email },
        accessToken,
      });
  } catch (error) {
    if (error) {
      return res.status(500).json({
        success: false,
        msg: "internal server error",
      });
    }
  }
};

// login
const handleUserLogin = async (req, res) => {
  const { email, password } = req?.body;

  //  if there is no email and pass
  if (!email || !password) {
    res.status(400).json({
      success: false,
      msg: "Email and Password is required",
    });
  }

  // after getting email ; finding that user
  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(403).json({
      success: false,
      msg: "Invalid Email or Password",
    });
  }

  // checking Password

  const verifyPass = await bcrypt.compare(password, user.password);

  if (!verifyPass) {
    res.status(403).json({
      success: false,
      msg: "Invalid Password",
    });
  }

  // if password is correct then create token

  const { accessToken, refreshToken } = createToken(user);

  // if failed to createtoken
  if (accessToken.length < 1 && refreshToken.length < 1) {
    res.status(500).json({
      success: false,
      msg: "Failed to generate token",
    });
  }

  // in end sending success response

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      domain: "localhost",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      msg: "Login Success",
      user: { id: user.id, name: user.name, email: user.email },
      accessToken,
    })
    .redirect("http://localhost:5173/");
};

// logout
const handleUserLogout = async (req, res) => {
  res?.clearCookie("refreshToken");
  res.json({
    success: "true",
    msg: "logout successfully",
  });
};

// refreshToken

const handleRefreshToken = async (req, res) => {
  const refreshTokenfromClient = req.cookies["refreshToken"];

  if (!refreshTokenfromClient && refreshTokenfromClient.length < 1) {
    res.status(401).json({
      success: false,
      msg: "User not authenticated no refresh token found",
      redirect: "/login",
    });
  }

  // console.log("from handleRefresh" + `${refreshTokenfromClient}`);

  try {
    const token = verifyToken(refreshTokenfromClient);
    const { accessToken, refreshToken } = createToken(token);

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        domain: "localhost",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        msg: "Login Success",
        user: { id: token.id, name: token.name, email: token.email },
        accessToken,
      });
  } catch (error) {
    if (error) {
      res.status(401).json({
        success: false,
        msg: "failed to verify refresh token please login",
      });
    }
  }
};

export {
  handleUserRegistration,
  handleUserLogin,
  handleUserLogout,
  handleRefreshToken,
};
