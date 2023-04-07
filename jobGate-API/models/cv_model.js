const mongoose = require("mongoose")

const cvSchema = new mongoose.Schema({
    cv:{
        type: String,
        required: true
    },
    candidate:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "candidates"
    }
})

module.exports = mongoose.model("cvs", cvSchema)