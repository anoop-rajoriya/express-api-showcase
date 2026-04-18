import crypto from "node:crypto"

export const generateHash = (payload)=>{
    return crypto.createHash("sha256").update(payload).digest("hex")
}

export const compareHash = ({userHash, dbHash})=>{
    const buffA = Buffer.from(userHash, "hex")
    const buffB = Buffer.from(dbHash, "hex")
    const match = buffA.length == buffB.length && crypto.timingSafeEqual(buffA, buffB)

    return match ? true : false
}

export const generateCode = (lenInBytes=3)=>{
    return crypto.randomBytes(lenInBytes).toString("hex")
}