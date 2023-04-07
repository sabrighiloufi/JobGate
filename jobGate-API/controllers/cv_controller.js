const cvModel = require("../models/cv_model")
const candidateModel = require("../models/candidate_model")

module.exports = {
    create: (req, res) => {
        req.body.cv = req.file.filename
        const cv = new cvModel(req.body)
        cv.save(req.body, (err, item) => {
            if(err){
                res.status(406).json({message: "cv not created"})
            }else{
                candidateModel.findByIdAndUpdate(cv.candidate, {cv: cv._id}, ()=> {
                    res.status(201).json({message: "cv created", data: item})
                })
            }
        })
    },
    getMyCv: (req, res) => {
        cvModel.find({candidate: req.params.id}, (err, cv) => {
            if(err){
                res.status(406).json({message: "you don't have cv"})
            }else{
                res.status(200).json({message: "your cv", data: cv})
            }
        })
    },
    getCvByID:(req, res) => {
        cvModel.findById(req.params.id).populate("candidate", '-password').exec((err, cv) => {
            if(err){
                res.status(406).json({message: "cv not found"})
            }else{
                res.status(200).json({message: "cv found", data: cv})
            }
        })
    },
    updateMyCv:(req, res) => {
        req.body.cv = req.file.filename
        cvModel.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, cv) => {
            if(err){
                res.status(406).json({message: "cv not updated"})
            }else{
                res.status(200).json({message: "cv updated", data: cv})
            }
        })
    },
    deleteMyCv: async (req, res) => {
        try {
            const cv = await cvModel.findOne({_id: req.params.id})
            await candidateModel.findByIdAndUpdate(cv.candidate, {$unset: {cv: ""}})
            await cvModel.deleteOne({_id: cv._id})
            res.status(200).json({message: "cv deleted"})
        } catch (error) {
            res.status(406).json(error)
        }
    },
    numberCvs:(req, res) => {
        cvModel.count({},(err, count) => {
            if(err){
                res.status(406).json({message: "error to count"})
            }else{
                res.status(200).json({message: "number of cv: ", data: count})
            }
        })
    }
}