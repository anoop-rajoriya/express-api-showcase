import dotenv from "dotenv"
dotenv.config()

export const PORT = Number(process.env.PORT) || 3000
export const NODE_ENV = process.env.NODE_ENV || "development"
export const MONGO_URI = process.env.MONGO_URL

export const TOKEN_SECRET = process.env.TOKEN_SECRET || "tokensecret"
export const TOKEN_EXPIRY = Number(process.env.TOKEN_EXPIRY) || 3600
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "accesssecret"
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || 900
export const REFRESH_TOKEN_SECRET = Number(process.env.REFRESH_TOKEN_SECRET) || "refreshsecret"
export const REFRESH_TOKEN_EXPIRY = Number(process.env.REFRESH_TOKEN_EXPIRY) || 86400