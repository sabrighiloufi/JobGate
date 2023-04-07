const favoriteModel = require("../models/favorite_model")
const candidateModel = require("../models/candidate_model")

module.exports = {
    create: async(req, res) => {
        const favorite = new favoriteModel(req.body)
        favorite.save(req.body, (err, item) => {
            if(err){
                res.status(406).json({message: "favorite not created"})
            }else{
                candidateModel.findByIdAndUpdate(favorite.candidate, 
                    {$push: {favorites: favorite}}, ()=>{
                        res.status(201).json({message: "favorite created", data: item})
                    }
                )
            }
        })
    },
    getMyfavorites: (req, res) => {
        favoriteModel.find({candidate:req.params.id}).populate({ 
            path: 'offer',
            populate: {
              path: 'company',
            } 
         }).exec((err,items)=>{
            if(err){
                res.status(404).json({ success: false, message: "you have no favorite offer", data: null})  
            }else{
                res.status(200).json({ success: true, message: "your favorite offers", data: items }) 
            }
        })
    },
    deletefavorite: async (req, res) => {
        try {
            const favorite = await favoriteModel.findOne({_id: req.params.id})
            await candidateModel.findByIdAndUpdate(favorite.candidate, {$pull: {favorites: favorite._id}})
            await favoriteModel.deleteOne({_id: favorite._id})
            res.status(200).json({message: "favorite deleted" }) 
        } catch (error) {
            res.status(200).json(error)
        }
    },
    deleteMyfavorites: async (req, res) => {
        try {
            const favorites = await favoriteModel.find({candidate: req.params.id})
            for (let favorite of favorites){
                await candidateModel.findByIdAndUpdate(favorite.candidate, {$pull: {favorites: favorite._id}})
                await favoriteModel.deleteOne({_id: favorite._id})
            }
            res.status(200).json({message: "all your favorite are deleted" }) 
        } catch (error) {
            res.status(200).json(error)
        }      
    },

}