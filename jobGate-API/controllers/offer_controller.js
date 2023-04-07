const offersModel = require("../models/offer_model")
const specialityModel = require("../models/speciality_model")
const companyModel = require("../models/company_model")
const contractModel = require("../models/contractTypes_model")
const skillsModel = require("../models/skills_model")
const locationModel = require("../models/location_model")
const { populate } = require("../models/offer_model")

const create = (req, res)=>{
    const offer = new offersModel(req.body)
    offer.save(req.body, async (err, item)=>{
        if(err){
            res.status(406).json({message: "offer not created"})
        }else{
            await companyModel.findByIdAndUpdate(offer.company, {$push: {offers: offer}})
            await specialityModel.findByIdAndUpdate(offer.speciality, {$push: {offers: offer}})
            await locationModel.findByIdAndUpdate(offer.location, {$push: {offers: offer}})
            //push offer in multiple skills
            for(let skill of offer.skills){
                await skillsModel.findByIdAndUpdate(skill, {$push: {offers: offer}})
            }
            for(let contract of offer.contract_types){
                await contractModel.findByIdAndUpdate(contract, {$push: {offers: offer}})
            }
            res.status(201).json({message: "offer created successfully", data: item})
        }
    })
}

const getAll = (req, res)=>{
    
    offersModel.find({}).lean().populate("company").populate("location").populate({path:"applications", 
    populate: {
      path: 'candidate',
     
    } }).exec((err, items)=>{
        if(err){
            res.status(406).json({message: "no offer found"})
        }else{
            res.status(201).json({message: "offers list", data: items})
        }
    })
}

const getByID = (req, res)=>{
    offersModel.findById(req.params.id).populate("company").exec( (err, item)=>{
        if(err){
            res.status(406).json({message: "no offer found"})
        }else{
            res.status(201).json({message: "offer found", data: item})
        }
    })
}

const getByQuery = async (req, res)=>{
    let {q}= req.query 
    let offers = await offersModel.find({
        $or:[
            {title: {$regex: q, $options:"i"}},
           
        ]
    }).lean().populate("company").populate("location")
    res.status(201).json({data:offers})
}

const update = (req, res)=>{
    offersModel.findByIdAndUpdate(req.params.id, req.body,{new:true}, (err, item)=>{
        if(err){
            res.status(406).json({message: "offer not updated"})
        }else{
            res.status(201).json({message: "offer updated", data: item})
        }
    })
}

const deleteOffer = async (req, res)=>{
    try {
        const offer = await offersModel.findById({_id:req.params.id})
        await specialityModel.findByIdAndUpdate(offer.speciality, {$pull: {offers: offer._id}})
        await companyModel.findByIdAndUpdate(offer.company, {$pull: {offers: offer._id}})
        await locationModel.findByIdAndUpdate(offer.location, {$pull: {offers: offer._id}})

        for(let skill of offer.skills){
            await skillsModel.findByIdAndUpdate(skill, {$pull: {offers: offer._id}})
        }
        for(let contract of offer.contract_types){
            await contractModel.findByIdAndUpdate(contract, {$pull: {offers: offer._id}})
        }
        await offersModel.deleteOne({_id:req.params.id})
        res.status(201).json({message: "offer deleted"})
    } catch (error) {
        res.status(406).json(error)
    }
}

//number of offer in each month on last year
const offersPerMonth = async (req, res)=>{
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    try {
       const data = await offersModel.aggregate([
        {$match: {createdAt: {$gte: lastYear}}},
        {$project: {month: {$month: "$createdAt"}}},
        {$group: {_id: "$month", totalOffers: {$sum: 1}}},
        {$sort: {_id: 1}}
       ])
       //const newData = data.sort((a, b) => a._id < b._id ? -1 : 1)
       res.status(200).json({data:data})
    } catch (error) {
        res.status(406).json(error)
    }
    
}

//number of offers in each speciality in last year
const offersPerSpeciality = async (req, res)=>{
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    try {
        const pipeline = [
            {$match: {createdAt: {$gte: lastYear}}},
            {
                $lookup:
                  {
                    from: "specialties",
                    localField: "speciality",
                    foreignField: "_id",
                    as: "spec"
                  }
            },
            {$project: { s: "$spec.name"}},
            {$group: {_id: "$s", totalOffers: {$sum: 1}}},
            {$unwind:"$_id" },
            {$sort: {totalOffers: 1}}
           ]
       const data = await offersModel.aggregate(pipeline)
       //const newData = data.sort((a, b) => a.totalOffers > b.totalOffers ? -1 : 1)
       res.status(200).json({data:data})
    } catch (error) {
        res.status(406).json(error)
    }
    
}

const numberOffers = (req, res) => {
    offersModel.count({},(err, count) => {
        if(err){
            res.status(406).json({message: "error to count"})
        }else{
            res.status(200).json({message: "number of offers: ", data: count})
        }
    })
}

const offersLastMonth = async (req, res)=>{
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))

    
    try { 
        const data = await offersModel.aggregate([
            {$match: {createdAt: {$gte: lastMonth},createdAt: {$lte: date} }},
            {
                $lookup:
                  {
                    from: "locations",
                    localField: "location",
                    foreignField: "_id",
                    as: "location"
                  }
            },
            
           ])
           
        res.status(200).json({data:data})
     } catch (error) {
         res.status(406).json(error)
     }
    
}

module.exports = {create, getAll, getByID, getByQuery, update, deleteOffer, offersPerMonth, offersPerSpeciality, numberOffers, offersLastMonth}

