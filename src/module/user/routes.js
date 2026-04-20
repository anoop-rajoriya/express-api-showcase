import express from 'express'
import * as controllers from "./controllers.js"
import * as DTOs from "./dtos.js"
import requestValidator from "../../common/middlewares/requestValidator.js"
import {authenticateUser, authorizeUser} from "./middlewares.js"
import {ROLES} from "../../config/constant.config.js"

const router = express.Router()

router.post("/register", requestValidator(DTOs.RegisterDTO), controllers.registerController)

router.post("/verify", requestValidator(DTOs.EmailVerifyDTO), controllers.verifyEmailController)

router.post("/login", requestValidator(DTOs.LoginDTO), controllers.loginController)

router.get("/me", authenticateUser(), authorizeUser([ROLES.USER, ROLES.ADMIN]), controllers.getProfileController)

router.post("/refresh", controllers.refreshTokenController)
router.post("/logout", controllers.logoutController)
router.post("/forgot-password", controllers.forgotPasswordController)
router.post("/new-password", controllers.newPasswordController)
router.patch("/change-password", controllers.changePasswordController)

export default router