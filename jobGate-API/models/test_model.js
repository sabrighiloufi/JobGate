const mongoose = require("mongoose")

const testSchema = new mongoose.Schema({
    test:[{
        question:String,
        correctResponse: String,
        responses:[{
            response:{
                type:String
            }
        }]
    }],
    offer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "offers",
        autopopulate: true
    },
    candidates:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "candidates"
    }]
}, {timestamps: true, versionKey: false})

testSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model("tests", testSchema)