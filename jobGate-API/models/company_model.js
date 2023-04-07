const mongoose = require("mongoose")
const userModel = require("./user_model")

const companySchema = new mongoose.Schema({
    address:{
        type:String,
        required:true
    },
    website:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    offers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "offers"
    }],
    speciality:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "specialties",
        autopopulate: true

    }
})
companySchema.plugin(require('mongoose-autopopulate'))


const companies = userModel.discriminator("companies", companySchema)

module.exports = mongoose.model("companies")