import ApiResponse from "../../common/utils/ApiResponse"
import * as userServices from "./services"

export const registerController = async (req, res) => {
    const {message, data} = await userServices.registerUser(req.body)
    return ApiResponse.created(res, message, data)
}

export const verifyEmailController = async (req, res) => {
    const {message, data} = await userServices.verifyUserEmail(req.body)
    return ApiResponse.ok(res, message, data)
}

export const loginController = async (req, res) => {
    const {message, data} = await userServices.authenticateUser(req.body)
    res.set("Authorization", `Bearer ${data.accessToken.token}`)
    res.cookie("accessToken", data.accessToken.token, {
        httpOnly: true,
    })

    return ApiResponse.ok(res, message, data)
}

export const getProfileController = async (req, res) => {
    const {data, message} = await userServices.getUser(req.user._id)
    return ApiResponse.ok(res, message, data)
}

export const refreshTokenController = async (req, res) => {
    const {message, data} = await userServices.refreshUserTokens(req.body)
    
    res.set("Authorization", `Bearer ${data.accessToken.token}`)

    res.cookie("accessToken", data.accessToken.token, {
        httpOnly: true,
    })

    return ApiResponse.created(res, message, data)
}

export const logoutController = async (req, res) => {
    const {message} = await userServices.logoutUser(req.user._id)
    return ApiResponse.ok(res, message)
}

export const forgotPasswordController = async (req, res) => {
    const {message, data} = await userServices.forgotUserPassword(req.body)
    return ApiResponse.ok(res, message, data)
}

export const resetPasswordController = async (req, res) => {
    const {message, data} = await userServices.resetUserPassword(req.body)
    return ApiResponse.ok(res, message, data)
}

export const updatePasswordController = async (req, res) => {
    const {message} = await userServices.newUserPassword({...req.body, userId: req.user._id})
    return ApiResponse.ok(res, message)
}