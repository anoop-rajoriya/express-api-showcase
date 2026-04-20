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

export const loginController = async (req, res) => { }
export const getProfileController = async (req, res) => { }
export const refreshTokenController = async (req, res) => { }
export const logoutController = async (req, res) => { }
export const forgotPasswordController = async (req, res) => { }
export const newPasswordController = async (req, res) => { }
export const changePasswordController = async (req, res) => { }