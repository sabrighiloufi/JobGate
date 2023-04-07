const testModel = require("../models/test_model")
const offerModel = require("../models/offer_model")

module.exports = {
    create: async (req, res) => {
        const offer = await testModel.findOne({offer: req.body.offer})
        if(offer){
            res.status(406).json({message: "offer has already test"})
        }else{
            const test = new testModel(req.body)
            test.save(req.body, (err, test) => {
                if(err){
                    res.status(406).json({message: "test not created"})
                }else{
                    offerModel.findByIdAndUpdate(test.offer, {test: test._id}, () =>{
                        res.status(201).json({message: "test created", data: test})
                    })
                }
            })
        }
    },
    getByID: (req, res) =>{
        testModel.findById(req.params.id, (err, test) => {
            if(err){
                res.status(406).json({message: "test not found"})
            }else{
                res.status(200).json({message: "test found", data: test})
            }
        })
    },
    update: (req, res) => {
        testModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, test) => {
            if(err){
                res.status(406).json({message: "test not updated"})
            }else{
                res.status(200).json({message: "test updated", data: test})
            }
        })
    },
    submitTest:async (req, res) => {
        const test = await testModel.findOne({_id: req.params.id})
        
        if(test.candidates.includes(req.body.candidate)){
            res.status(406).json({message: "you already submit this test"})
        }else{
            testModel.findByIdAndUpdate(req.params.id, {$push: {candidates: req.body.candidate}}, {new: true}, (err, test) => {
                if(err){
                    res.status(406).json({message: "test not updated"})
                }else{
                    res.status(200).json({message: "test updated", data: test})
                }
            })
        }
    },
    deleteTest: async (req, res) => {
        try {
            const test = await testModel.findOne({_id: req.params.id})
            await offerModel.findByIdAndUpdate(test.offer, { $unset: { test: ""} })
            await testModel.deleteOne({_id: test._id})
            res.status(200).json({message: "test deleted"})
        } catch (error) {
            res.status(406).json(error)
        }
    }
}