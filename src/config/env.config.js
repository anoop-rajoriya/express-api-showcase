import dotenv from "dotenv"
dotenv.config()

export const PORT = Number(process.env.PORT) || 3000
export const NODE_ENV = process.env.NODE_ENV || "development"
export const MONGO_URI = process.env.MONGO_URL
export const SMTP_USER = process.env.SMTP_USER
export const SMTP_PASS = process.env.SMTP_PASS
export const SENDER_MAIL_ADDRESS = process.env.SENDER_MAIL_ADDRESS