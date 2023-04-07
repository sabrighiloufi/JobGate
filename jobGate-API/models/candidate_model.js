const mongoose = require("mongoose")
const userModel = require("./user_model")
const candidateSchema = new mongoose.Schema({
    level:{
        type: Number,
        default: 0,
    },
    tests:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"tests"
    }],
    applications:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "applications"
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments"
    }],
    favorites:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "favorites"
    }],
    cv:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cvs",
        autopopulate: true
    },
    desired_job:{
        type:String
    }, 
    aboutme:{
        type:String
    }
})
candidateSchema.plugin(require('mongoose-autopopulate'))

const candidates = userModel.discriminator("candidates", candidateSchema)
module.exports = mongoose.model("candidates")