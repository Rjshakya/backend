import jwt from "jsonwebtoken";
import "dotenv/config";

const secretKey = String(process.env.SECRET_KEY);

const createToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, secretKey, { expiresIn: "10m" });
  const refreshToken = jwt.sign(payload, secretKey, { expiresIn: "7d" });

  return { accessToken, refreshToken };
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

export { createToken, verifyToken };
