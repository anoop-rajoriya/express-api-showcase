import express from 'express'
import * as controllers from "./controllers.js"

const router = express.Router()

router.post("/register", controllers.registerController)
router.post("/login", controllers.loginController)
router.post("/verify", controllers.verifyEmailController)
router.get("/me", controllers.getProfileController)
router.post("/refresh", controllers.refreshTokenController)
router.post("/logout", controllers.logoutController)
router.post("/forgot-password", controllers.forgotPasswordController)
router.post("/new-password", controllers.updatePasswordController)
router.patch("/change-password", controllers.changePasswordController)

export default router