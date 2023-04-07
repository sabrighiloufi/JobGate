const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    specialties:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"specialties"
    }]
},{timestamps:true})

module.exports = mongoose.model("categories", categorySchema)