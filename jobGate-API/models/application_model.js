const mongoose = require("mongoose")
const applicationSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true,
        default: "0"
    },
    letter:{
        type:String
    },
    status:{
        type:String,
        default: 'pending'
    },
    offer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "offers"
    },
    candidate:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "candidates",
        autopopulate: true
    }
}, {timestamps: true})

applicationSchema.plugin(require('mongoose-autopopulate'))


module.exports = mongoose.model("applications", applicationSchema)