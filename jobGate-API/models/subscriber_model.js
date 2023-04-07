const mongoose = require("mongoose")
const subscriberSchema = new mongoose.Schema({
    email:{
        type:String,
    }
})

module.exports = mongoose.model("subscribers", subscriberSchema)