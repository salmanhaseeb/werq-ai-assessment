import dotenv from "dotenv";
dotenv.config({path: '../.env'});

export const config = {
    DATABSE_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV || null
}