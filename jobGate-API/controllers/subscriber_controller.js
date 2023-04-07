const subscriberModel = require("../models/subscriber_model")

module.exports = {
    create: async (req, res)=>{
        const subscriber = new subscriberModel(req.body)
        const email = await subscriberModel.findOne({email:req.body.email})
        if(email){
            res.status(406).json({message: "you are already subscribed"})
        }else{
            subscriber.save(req.body, async (err, item)=>{
                if(err){
                    res.status(406).json({message: "error to subscribe"})
                }else{
                   
                    res.status(201).json({message: "you are subscribed", data:item})
                }
            })
        }
    },
    getAll: (req, res) => {
        subscriberModel.find({}, (err, items)=>{
            if(err){
                res.status(406).json({message: "no subscriber found"})
            }else{
                res.status(201).json({message: "Subscribers", data:items})
            }
        })
    },
}