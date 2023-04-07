const commentModel = require("../models/comment_model")
const offerModel = require("../models/offer_model")
const candidateModel =require("../models/candidate_model")

module.exports = {
    create: (req, res)=>{
        const comment = new commentModel(req.body)
        comment.save(req.body, async (err, item)=>{
            if(err){
                res.status(406).json({message: "comment not created"})
            }else{
                await offerModel.findByIdAndUpdate(comment.offer, {$push: {comments: comment}})
                await candidateModel.findByIdAndUpdate(comment.candidate, {$push: {comments: comment}})
                res.status(201).json({message: "comment created", data:item})
            }
        })
    },
    getAll: (req, res) => {
        commentModel.find({}, (err, items)=>{
            if(err){
                res.status(406).json({message: "no comment found"})
            }else{
                res.status(201).json({message: "comments list", data:items})
            }
        })
    },
    getByID: (req, res) => {
        commentModel.findById(req.params.id, (err, item)=>{
            if(err){
                res.status(406).json({message: "no comment found"})
            }else{
                res.status(201).json({message: "comment found", data:item})
            }
        })
    }, 
    getByQuery: async (req, res) => {
        let {q} = req.query 
        let comments = await commentModel.find({
            $or:[
                {comment: {$regex: q, $options:"i"}}
            ]
        })
        res.status(201).json(comments)
    },
    update: (req, res)=>{
        commentModel.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, item)=>{
            if(err){
                res.status(406).json({message: "comment not updated"})
            }else{
                res.status(201).json({message: "comment updated", data: item})
            }
        })
    },
    deleteComment: async (req, res)=>{
        try {
            const comment = await commentModel.findOne({_id: req.params.id})
            await offerModel.findByIdAndUpdate(comment.offer, {$pull: {comments: comment._id}})
            await candidateModel.findByIdAndUpdate(comment.candidate, {$pull: {comments: comment._id}})
            await commentModel.deleteOne({_id: req.params.id})
            res.status(200).json({message: "comment deleted"})
        } catch (error) {
            res.status(406).json(error)
        }
    }
}