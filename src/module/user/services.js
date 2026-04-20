import {User} from "./model.js"
import ApiError from "../../common/utils/ApiError.js"
import {getOTPToken, accessToken, refreshToken} from "../../common/utils/token.utils.js"

export const registerUser = async({name, email, password})=>{
// 1. first and last name saparation
    const [firstName, lastName=undefined] = name.split(" ")

// 2. check email existance (Error: Email already registered)
    const isExist = await User.findOne({email})
    if(isExist) throw ApiError.badRequest("Email already registred")

// 3. generate varification code (1d)
    const verificationToken = getOTPToken()

// 4. create user entry with password_has & verification token
    const creaedUser = await User.create({
        firstName,
        lastName,
        email,
        password: password_hash,
        verificationToken
    })

// 6. send verification email code (not implemented)

// 7. return user
    return {userId: user._id, 
        email, 
        name, 
        message: "User registred successfully"
    }
}

export const verifyUserEmail = async ({userId, code})=>{
    // 1. find user (Error: User not found)
    const user = await User.findById(userId).select("+verificationToken")
    if(!user) throw ApiError.notFound("User not found")

    // 2. match code (Error: Invalid verification code)
    if(user.verificationToken.token !== code)
        throw ApiError.badReques("Invlaid verification code")

    // 2. check code expiry (Error: Verification code expired)
    const isExpired = Date.now() > user.verificationToken.expiry
    if(isExpired) 
        throw ApiError.badRequest("Verification code expired")

    // 4. Mark verify user in databse entry
    user.isVerified = true
    await user.save()

    // 5. return userId
    return {userId: user._id, message: "User email verified successfully"}
}

export const resendVerificationCode = async({email})=>{
    // 1. find user using email (Error: User not registred)
    const user = await User.findOne({email}).select("+verificationToken")
    if(!user) throw ApiError.notFound("User not registred")

    // 2. check is already verified (Success: User already veryfied)
    if(user.isVerified){
        return {message: "User already veryfied", isVerified: true}
    }

    // 3. code exist and not expired send it
    const {token=null, expiry} = user.verificationToken
    const now = Date.now()
    if(token && expiry >= now){
        // send email verification code
        return {message: "email verification code sended", isVerified: false}
    }

    // 4. generate new code & save into db
    const verificationToken = getOTPToken()
    user.verificationToken = verificationToken
    await user.save()

    // 5. send verification code to email (not implemented yet)

    // 6. return code
    return {message: "email verification code sended", isVerified: false}
}

export const authenticateUser = async ({email, password})=>{
    // 1. find user by email (Error: User not registred)
    const user = await User.findOne({email}).select("+password")
    if(!user) throw ApiError.notFound("User not registred")

    // 2. compair password hashs (Error: Email or password invalid)
    const isMatch = await User.comparePassword(password)
    if(isMatch) throw ApiError.badRequest("Email or password invalid")

    // 3. generate jwt tokens (access & refresh token)
    const accessToken = accessToken.get({userId: user._id, email: user.email, name: user.firstName, role: user.role})
    const refreshToken = refreshToken.get({userId: user._id})

    // 4. update in db with expiry
    user.refreshToken = refreshToken
    await user.save()

    // 5. return tokens
    return {accessToken, refreshToken}
}

// export const getUser = async ({userId})=>{
//     // 1. find user (Error: User not found)
//     const user = await User.findById(userId)
//     // 2. return user details
//     return user
// }

// export const refreshUserTokens = async ({refreshToken})=>{
//     // 1. varify token
//     const decoded = verifyTokens(refreshToken, REFRESH_TOKEN_SECRET)

//     // 2. find user and match token
//     const user = await User.findOne({_id: decoded.userId}).select("+refreshToken")
//     if(!user || user.refreshToken !== refreshToken){
//         throw new Error("Invalid refresh token")
//     }

//     // 3. check expiry
//     const now = new Date()
//     if(now > user.refreshToken.expiry){
//         throw new Error("Expired Token, please login")
//     }

//     // 4. generate new tokens
//     const [accessToken, accessTokenExpiry] = generateAccessToken({userId: user._id, email: user.email, name: user.firstName})
//     const [refreshToken, refreshTokenExpiry] = generateRefreshToken({userId: user._id})

//     // 5. update tokens in db
//     user.refreshToken = {token: refreshToken, expiry: refreshTokenExpiry}
//     await user.save()

//     // 6. return new tokens
//     return {accessToken, refreshToken}
// }

// export const logoutUser = async ({userId})=>{
//     // 1. find user (Error: User not found)
//     // 2. delete tokens from db
//     const user = await User.findByIdAndUpdate(userId, {refreshToken: {token: undefined, expiry: undefined}})
//     if(!user) throw new Error("User not found")

//     // return user id (Success: User logged out successful)
//     return {userId: user._id, message: "User successfully logged out"}
// }

// export const forgotUserPassword = async ({email})=>{
//     // 1. find user by email (Error: Email not registred)
//     const user = await User.findOne({email}).select("+passwordToken")
//     if(!user) throw new Error("Email not registred")

//     // 2. generate forgot password code and expiry
//     const newCode = generateCode()
//     const newExpiry = new Date(Date.now() + TOKEN_EXPIRY * 1000)

//     // 3. update code in user entry
//     user.passwordToken = {token: newCode, expiry: newExpiry}
//     await user.save()

//     // 4. send code to registred email
//     // Todo for future

//     // 5. return userId (Success: Forgot password sent to email)
//     return {userId: user._id, message: "Forgot password sent to email"}
// }

// export const newUserPassword = async ({userId, code, password})=>{
//     // 1. find user by id (Error: user not found)
//     const user = await User.findById(userId).select("+passwordToken")
//     if(!user) 
//         throw new Error("User not found")
//     const {token, expiry} = user.passwordToken

//     // 2. compare password and check expiry (Error: code invalid or expired)
//     if(code !== token)
//         throw new Error("Invalid forgot password code")

//     const now = Date.now()
//     if(now > expiry)
//         throw new Error("Forgot password code expired")

//     // 3. generate password hash and update in user entry
//     const password_hash = generateHash(password)

//     user.password = password_hash
//     await user.save()

//     // 4. return userId (Success: New password added)
//     return {userId: user._id, message: "New password added"}
// }

// export const updateUserPassword = async ({userId, oldPassword, newPassword})=>{
//     // 1. find user by id (Error: User not found)
//     const user = await User.findById(userId).select("+password")
//     if(!user)
//         throw new Error("User not found")

//     // 2. compare old password (Error: Old password is incorrect)
//     const isMatch = compareHash(oldPassword, user.password)
//     if(!isMatch)
//         throw new Error("Old password is incorrect")

//     // 3. generate new password hash
//     const new_password_hash = generateHash(newPassword)

//     // 4. update password
//     user.password = new_password_hash
//     await user.save()

//     // 5. return userId (Success: Password updated with new password)
//     return {userId, message: "Password updated with new password"}
// }