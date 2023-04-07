const contractTypes_model = require("../models/contractTypes_model")
const contractModel = require("../models/contractTypes_model")

module.exports = {
     create:async (req, res) => {
        const type = new contractModel(req.body)
        const contract = await contractModel.findOne({name: type.name})
        if(contract){
            res.status(406).json({message: "contract type exist"})
        }else{
            type.save(req.body, (err, item) => {
                if(err){
                    res.status(406).json({message: "contract type not created"})
                }else{
                    res.status(201).json({message: "contract type created", data: item}) 
                }
            })
        }
        
    },
    getAll: (req, res) => {
        contractModel.find({}, (err, ct) => {
            if(err){
                res.status(406).json({message: "no contract type found"})
            }else{
                res.status(200).json({message: "contract types :", data: ct})
            }
        })
    },
    getByID:(req, res) => {
        contractModel.findById(req.params.id, (err, ct) => {
            if(err){
                res.status(406).json({message: "contract type not found"})
            }else{
                res.status(200).json({message: "contract type found", data: ct})
            }
        })
    },
    updateContract:(req, res) => {
        contractModel.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, ct) => {
            if(err){
                res.status(406).json({message: "contract type not updated"})
            }else{
                res.status(200).json({message: "contract type updated", data: ct})
            }
        })
    },
    deletecontract: async (req, res) => {
        try {
            const ct = await contractModel.findOne({_id: req.params.id})
            //await candidateModel.findByIdAndUpdate(cv.candidate, {$unset: {cv: ""}})
            await contractModel.deleteOne({_id: ct._id})
            res.status(200).json({message: "contract type deleted"})
        } catch (error) {
            res.status(406).json(error)
        }
    }
}