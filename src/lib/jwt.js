import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export const signJwt = (payload) => jwt.sign(payload, SECRET, { expiresIn: "7d" });

export const verifyJwt = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
};
