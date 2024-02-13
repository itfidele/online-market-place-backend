import dotenv from "dotenv";


dotenv.config();


export const APP_HOST = process.env.HOST || "localhost";
export const APP_PORT = process.env.PORT || 3000;
export const APP_JWT_SECRET = process.env.JWT_SECRET || "secret";
export const APP_BASE_URL = process.env.BASE_URL || `http://localhost:${APP_PORT}`;