const userModel = require("../models/user_model")
const {join} = require("path")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET
const mailController = require("./mail_controller")
const DOMAIN = process.env.DOMAIN
const PORT = process.env.PORT



const generateAccessToken = function(user){
    return jwt.sign({id:user._id, email:user.email}, JWT_SECRET, {expiresIn: "24h"})
}

module.exports = {
    login:async (req, res)=>{
    
        userModel.findOne({email:req.body.email}, async  (err, user) => {
          
            if (err) {
            res.status(406).json({ status: 406, message: "error login", data: null });
            
            } else {
                if (user) {
                    if (user.verified === false) {
                        mailController(user.email, "Welcome " + user.fullname, 
                        `<h2>Hello ${user.fullname}! </h2>
                        <p>We're glad to have you on board at ${user.email}. </p>
                        <p>We're glad to have you on board at JobGate</p>
                        <table class="action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative; -premailer-cellpadding: 0; -premailer-cellspacing: 0; -premailer-width: 100%; margin: 30px auto; padding: 0; text-align: center; width: 100%;">
                        <tr>
                        <td style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative;">
                        <a align="center" href="${DOMAIN}:${PORT}/auth/verify-email/${user.verificationCode}" class="button button-primary" target="_blank" rel="noopener" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative; -webkit-text-size-adjust: none; border-radius: 4px; color: #fff; display: inline-block; overflow: hidden; text-decoration: none; background-color: #2d3748; border-bottom: 8px solid #2d3748; border-left: 18px solid #2d3748; border-right: 18px solid #2d3748; border-top: 8px solid #2d3748;">Click here to Verify your account</a>
                        </td>
                        </tr>
                        </table>`
                    )
                        res.status(406).json({message: "please check your email and verify your account"})
        
                    } else {
                        const validPassword = await bcrypt.compareSync(req.body.password, user.password)
                        if (validPassword) {
                            const accessToken = generateAccessToken(user);
                    
                            res.status(200).json({status: 200,message: " user found",data:user,accessToken});
                        } else {
                            res.status(404).json({status: 406, message: "password incorrect", data: null,});
                        }
                    }   
                }  else {
                    res.status(406).json({ status: 406, message: " email is not found", data: null });
                }
            }
        });
    },
    VerifyEmail: async (req, res) => {
        try {
            const user = await userModel.findOne({verificationCode: req.params.verificationCode})
            user.verified = true
            user.verificationCode = undefined
            user.save()
            res.sendFile(join(__dirname, "../verification_templates/success.html"))
        } catch (error) {
            res.sendFile(join(__dirname, "../verification_templates/error.html"))
        }
    },
    ForgetPassword: async (req, res) =>{
        const user = await userModel.findOne({email: req.body.email})
        if(!user){
            res.status(406).json({message: "email not found"})
        }
        const resetPasswordToken = await generateAccessToken(user)
        user.resetPasswordToken = resetPasswordToken
        user.save()
        mailController(user.email,
            "Reset Password ", 
           `<h2>Hello ${user.fullname}! </h2>
           <p>click here to reset your password: </p>
           <table class="action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative; -premailer-cellpadding: 0; -premailer-cellspacing: 0; -premailer-width: 100%; margin: 30px auto; padding: 0; text-align: center; width: 100%;">
           <tr>
           <td style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative;">
           <a align="center" href="http://localhost:4200/reset-password/${user.resetPasswordToken}" class="button button-primary" target="_blank" rel="noopener" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative; -webkit-text-size-adjust: none; border-radius: 4px; color: #fff; display: inline-block; overflow: hidden; text-decoration: none; background-color: #2d3748; border-bottom: 8px solid #2d3748; border-left: 18px solid #2d3748; border-right: 18px solid #2d3748; border-top: 8px solid #2d3748;">Reset Password</a>
           </td>
           </tr>
           </table>`
        )
        res.status(200).json({message: "email reset password sended "})
    }, 
    resetPassword: (req, res) => { 
        try {
            jwt.verify(req.params.resetPasswordToken, JWT_SECRET, async (err)=>{
                if(err){
                    res.status(406).json("token expired")    
                }
                const user = await userModel.findOne({resetPasswordToken: req.params.resetPasswordToken})
                const salt = bcrypt.genSaltSync(10)
                const hashPassword = bcrypt.hashSync(req.body.password, salt)
                user.password = hashPassword
                user.resetPasswordToken = undefined 
                user.save()
                res.status(200).json({message: "password updated successfully"})
            })
        } catch (error) {
            res.status(406).json(error)
        } 
    },
    changePassword:async (req, res) => {
        try {
            const user = await userModel.findOne({_id: req.params.id})
            // console.log(user.fullname)
            const validPassword = await bcrypt.compareSync(req.body.password, user.password)
            // console.log(validPassword)
            if (validPassword) {
                const salt = bcrypt.genSaltSync(10)
                const hashPassword = bcrypt.hashSync(req.body.newpassword, salt)
                user.password = hashPassword 
                user.save()
                res.status(200).json({message: "password updated successfully"})
            } else {
                res.status(404).json({status: 406, message: "password incorrect", data: null,});
            }
               
        } catch (error) {
            res.status(406).json(error)
        }
    }



}