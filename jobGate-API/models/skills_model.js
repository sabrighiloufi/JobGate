const mongoose = require("mongoose")
const skillsSchema = new mongoose.Schema({
    skillname:{
        type: String,
        required: true
    },
    offers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"offers",
    }],
    speciality:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"specialties",
    }, 
})

module.exports = mongoose.model("skills", skillsSchema)