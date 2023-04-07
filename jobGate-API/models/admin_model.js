const mongoose = require("mongoose")
const userModel = require("./user_model")

const adminSchema = new mongoose.Schema({
    role:{
        type: String,
        enum:["admin", "assistant"],
        default: "admin"
    },
    aboutme:{
        type:String
    }
})

const admins = userModel.discriminator("admins", adminSchema)
module.exports = mongoose.model("admins")
