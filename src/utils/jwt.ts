import { APP_BASE_URL, APP_JWT_SECRET } from "../config/env";
import crypto from "crypto";
import * as jwt from "jsonwebtoken";


export async function getUserToken(
  email: string,
  userId: any,
  isAdmin: boolean
): Promise<string | undefined> {
  let payload = {};
  let options: jwt.SignOptions;
  const jwtid = crypto.randomBytes(16).toString("hex");
  payload = {
    email,
    userId,
    isAdmin,
  };
  options = {
    keyid: userId,
    jwtid,
    notBefore: "0",
    issuer: userId,
    subject: userId,
    audience: `http://${APP_BASE_URL}/auth/login`,
    expiresIn: "7d",
    algorithm: "HS256",
  };
  return jwt.sign(JSON.stringify(payload), APP_JWT_SECRET);
}

export async function decodeTokenizedRequest(token: string): Promise<any> {
  let actualToken = token;
  if (token.startsWith("Bearer")) {
    const splittedToken = token.split(" ");
    actualToken = splittedToken[1];
  }

  try {
    const decoded = jwt.decode(actualToken) as {
      userId: string;
      email: string;
      isAdmin: boolean;
    };
    return decoded;
  } catch (error) {
    throw new Error("Error processing the token");
  }
}