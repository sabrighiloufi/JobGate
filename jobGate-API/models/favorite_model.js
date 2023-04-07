const mongoose = require("mongoose")

const favoriteSchema = new mongoose.Schema({
    offer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "offers",
        
    },
    candidate:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "candidates"
    }
}, {timestamps: true})



module.exports = mongoose.model("favorites", favoriteSchema) 