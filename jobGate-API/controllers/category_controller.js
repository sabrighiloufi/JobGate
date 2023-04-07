const categoryModel = require("../models/category_model")

const create = async (req, res)=>{
    const category = new categoryModel(req.body) 
    const name = await categoryModel.findOne({name: category.name})
    if(name){
        res.status(406).json({message: "category exist"})
    }else{   
        category.save(req.body, (err, item)=>{
            if(err){
                res.status(406).json({mesage: "category not created"})
            }else{
                res.status(201).json({mesage: "category created", data: item})
            }
        })
    }
}

const getAll = (req, res)=>{
    categoryModel.find({}, (err, items)=>{
        if(err){
            res.status(406).json({mesage: "no category found"})
        }else{
            res.status(201).json({mesage: "categories list", data: items})
        }
    })
}

const getByID = (req, res)=>{
    categoryModel.findById(req.params.id, (err, item)=>{
        if(err){
            res.status(406).json({mesage: "no category found"})
        }else{
            res.status(201).json({mesage: "category found", data: item})
        }
    })
}

const getByQuery = async (req, res)=>{
    let {q} = req.query 
    let categories = await categoryModel.find({
        $or:[
            {name: {$regex: q, $options: "i"}},
            {description: {$regex: q, $options: "i"}}
        ]
    })
    res.status(201).json(categories)
}

const update = (req, res)=>{
    categoryModel.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, item)=>{
        if(err){
            res.status(406).json({mesage: "category not updated"})
        }else{
            res.status(201).json({mesage: "category updated", data: item})
        }
    })
}

const deleteCategory = (req, res)=>{
    categoryModel.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            res.status(406).json({mesage: "category not deleted"})
        }else{
            res.status(201).json({mesage: "category deleted"})
        }
    })
}

module.exports = {create, getAll, getByID, getByQuery, update, deleteCategory}