import jwt from "jsonwebtoken"

import {ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY} from "../../config/env.config.js"

export const generateAccessToken = (payload)=>{
const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: parseInt(ACCESS_TOKEN_EXPIRY)})
const expiry = new Date(Date.now() + parseInt(ACCESS_TOKEN_EXPIRY) * 1000)

return [token, expiry]
}

export const generateRefreshToken = (payload)=>{
const token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: parseInt(REFRESH_TOKEN_EXPIRY)})
const expiry = new Date(Date.now() + parseInt(REFRESH_TOKEN_EXPIRY) * 1000)
return [token, expiry]
}

export const verifyTokens = (token, secret) => {
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        throw new Error("Invalid or Expired token")
    }
}