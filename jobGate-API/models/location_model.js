const mongoose = require("mongoose")

const favoriteSchema = new mongoose.Schema({
    offers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "offers"
    }],
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("locations", favoriteSchema) 