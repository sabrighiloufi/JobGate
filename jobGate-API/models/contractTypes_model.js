const mongoose = require("mongoose")

const contractSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    offers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "offers"
    }],
})

module.exports = mongoose.model("contract-types", contractSchema)