import {TOKEN_EXPIRY} from "../../config/env.config.js"
import {User} from "./model.js"
import ApiError from "../../common/utils/ApiError.js"
import {generateHash, compareHash, generateCode} from "../../common/utils/crypto.js"

export const registerUser = async({name, email, password})=>{
// 1. first and last name saparation
    const [firstName, lastName=undefined] = name.split(" ")

// 2. check email existance (Error: Email already registered)
    const isExist = await User.findOne({email})
    if(isExist) throw new Error("Email alredy registered")

// 3. generate password_hash
    const password_hash = generateHash(password)

// 4. generate varification code (1h)
    const code = generateCode()
    const codeExpiry = new Date(Date.now() + TOKEN_EXPIRY * 1000)

// 5. create user entry with password_has & verification token
    const creaedUser = await User.create({
        firstName,
        lastName,
        email,
        password: password_hash,
        verificationToken: {
            token: code,
            expiry: codeExpiry
        }
    })

// 6. send verification email code
    // todo: send email

// 7. return user id
    return createdUser
}

export const verifyUser = ({userId, code})=>{
    // 1. find user (Error: User not found)
    const user = await User.findById(userId).select("+verificationToken")
    if(!user) throw new Error("User not found")

    // 2. check code expiry (Error: Verification code expired)
    const isExpired = Date.now() > user.verificationToken.expiry
    if(isExpired) throw new Error("Verification code expired")

    // 3. match code (Error: Invalid verification code)
    if(user.verificationToken.token !== code){
        throw new Error("Invalid verification code")
    }

    // 4. Mark verify user in databse entry
    user.isVerified = true
    await user.save()

    // 5. return userId
    return userId
}

