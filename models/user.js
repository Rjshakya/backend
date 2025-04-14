import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["normal", "admin"],
      default: "normal",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    verifiedEmail: {
      type: String,
    },
    OauthProvider: {
      type: String,
    },
    picture: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(this.password, salt);
    this.password = hashedPass;
    next();
  } catch (error) {
    throw new Error(error);
  }
});

const User = mongoose.model("user", UserSchema);

export default User;
