import crypto from "node:crypto"
import jwt from "jsonwebtoken"
import {TOKENS} from "../../config/constant.config.js"
import {getExpiryTimestamp} from "./timestemp.utils.js"

export const accessToken = {
    get: (payload)=>{
        const token = jwt.sign(payload, TOKENS.ACCESS_SECRET, {expiresIn: TOKENS.ACCESS_EXPIRY})
        return {token, expiry: new Date(getExpiryTimestamp(TOKENS.ACCESS_EXPIRY))}
    },
    verify: (token)=>{
        return jwt.verify(token, TOKENS.ACCESS_SECRET)
    }
}

export const accessToken = {
    get: (payload)=>{
        const token = jwt.sign(payload, TOKENS.REFRESH_SECRET, {expiresIn: TOKENS.REFRESH_EXPIRY})
        return {token, expiry: new Date(getExpiryTimestamp(TOKENS.REFRESH_EXPIRY))}
    },
    verify: (token)=>{
        return jwt.verify(token, TOKENS.REFRESH_SECRET)
    }
}

export const getOTPToken = (lenInBytes=3)=>{
    const token = crypto.randomBytes(lenInBytes).toString("hex")
    
    return {token, expiry: new Date(getExpiryTimestamp(TOKENS.GENERIC_EXPIRY))}
}