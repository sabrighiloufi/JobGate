const mongoose = require("mongoose")

const offerSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    postes:{
        type: Number,
        required: true
    },
    salary:{
        type: Number,
        required:true
    },
    contract_types:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"contract-types",
        autopopulate: true
    }],
    expiration_date:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    type:{
        type: String,
    },
    confirmed:{
        type: Boolean,
        default: false,
        required: true
    },
    speciality:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"specialties",
        autopopulate: true
    },
    skills:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"skills",
        autopopulate: true
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
        autopopulate: true
    }],
    test:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tests",
        autopopulate: true
    },
    applications:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "applications",
        autopopulate: true
    }],
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "companies",
    },
    location:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "locations",
        autopopulate: true
    },

}, {timestamps: true, versionKey: false})

offerSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model("offers", offerSchema)