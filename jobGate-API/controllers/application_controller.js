const applicationModel = require("../models/application_model")
const offerModel = require("../models/offer_model")
const candidateModel = require("../models/candidate_model")
const { application } = require("express")

module.exports = {
    create: async (req, res) => {
        const application = new applicationModel(req.body)
         application.save(req.body, async (err, item) => {
            if(err){
                res.status(406).json({message: "application not created"})
            }else{
                await offerModel.findByIdAndUpdate(application.offer, {$push: {applications: application}})
                await candidateModel.findByIdAndUpdate(application.candidate, {$push: {applications: application}})
                res.status(201).json({message: "application created", data: item})
            }
        })
    },
    getAll: (req, res) => {
        applicationModel.find({}).populate({path: "offer", 
        populate:"company"}).populate('candidate').exec((err, applications) => {
            if(err){
                res.status(406).json({message: "no application found"})
            }else{
                res.status(200).json({message: "applications list", data: applications})
            }
        })
    },
    getByID: (req, res) => {
        applicationModel.findById(req.params.id, (err, application) => {
            if(err){
                res.status(406).json({message: "no application found"})
            }else{
                res.status(200).json({message: "application found", data: application})
            }
        })
    },
    update: (req, res) => {
        applicationModel.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, application) => {
            if(err){
                res.status(406).json({message: "application not updated"})
            }else{
                res.status(200).json({message: "application updated", data: application})
            }
        })
    },
    deleteApplication: async (req, res) => {
        try {
            const application = await applicationModel.findOne({_id: req.params.id})
            await offerModel.findByIdAndUpdate(application.offer, {$pull: {applications: application._id}})
            await candidateModel.findByIdAndUpdate(application.candidate, {$pull: {applications: application._id}})
            await applicationModel.deleteOne({_id: application._id})
            res.status(200).json({message: "application deleted"})
        } catch (error) {
            res.status(406).json(error)
        }
    }



}