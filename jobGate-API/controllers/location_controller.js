const locationModel = require("../models/location_model")
const offerModel = require("../models/offer_model")

module.exports = {
    create: async (req, res) => {
            const locat = new locationModel(req.body)
            locat.save(req.body, (err, l) => {
                if(err){
                    res.status(406).json({message: "location not created" + err})
                }else{
                   res.status(201).json({message: "location created", data: l})
                }
            })
    },
    getAll: (req, res) => {
        locationModel.find({}, (err, items)=>{
            if(err){
                res.status(406).json({message: "no location found"})
            }else{
                res.status(201).json({message: "locations list", data:items})
            }
        })
    },
    getByID: (req, res) => {
        locationModel.findById(req.params.id, (err, item)=>{
            if(err){
                res.status(406).json({message: "no location found"})
            }else{
                res.status(201).json({message: "location found", data:item})
            }
        })
    }, 
    getByQuery: async (req, res) => {
        let {q} = req.query 
        let locations = await locationModel.find({
            $or:[
                {address: {$regex: q, $options:"i"}},
                {city: {$regex: q, $options:"i"}},
                {country: {$regex: q, $options:"i"}},
            ]
        })
        res.status(201).json(locations)
    },
    update: (req, res)=>{
        locationModel.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, item)=>{
            if(err){
                res.status(406).json({message: "location not updated"})
            }else{
                res.status(201).json({message: "location updated", data: item})
            }
        })
    },
    deleteLocation: async (req, res)=>{
        try {
            const location = await locationModel.findOne({_id: req.params.id})
            // await offerModel.findByIdAndUpdate(comment.offer, {$pull: {comments: comment._id}})
            // await candidateModel.findByIdAndUpdate(comment.candidate, {$pull: {comments: comment._id}})
            await locationModel.deleteOne({_id: req.params.id})
            res.status(200).json({message: "location deleted"})
        } catch (error) {
            res.status(406).json(error)
        }
    }
}