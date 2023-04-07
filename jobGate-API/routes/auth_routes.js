const express = require("express")
const route = express.Router()
const authController = require("../controllers/auth_controller")
const verifyToken = require("../middlewares/verify_token")


route.post("/login", authController.login)
route.get("/verify-email/:verificationCode", authController.VerifyEmail)
route.post("/forget-password", authController.ForgetPassword)
route.post("/reset-password/:resetPasswordToken", authController.resetPassword)
route.post("/change-password/:id", verifyToken,  authController.changePassword)



module.exports = route