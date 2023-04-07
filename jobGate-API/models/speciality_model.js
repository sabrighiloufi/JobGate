const mongoose = require("mongoose")

const specialitySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    offers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "offers",
            autopopulate: true
        }
    ],
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"categories",
        autopopulate: true
    },
    companies:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "companires"
    }],
    skills:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "skills",
        autopopulate: true
    }]
},{timestamps:true})

specialitySchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model("specialties", specialitySchema)
