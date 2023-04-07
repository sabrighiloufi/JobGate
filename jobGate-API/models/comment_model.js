const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true
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
commentSchema.plugin(require('mongoose-autopopulate'))


module.exports = mongoose.model("comments", commentSchema)