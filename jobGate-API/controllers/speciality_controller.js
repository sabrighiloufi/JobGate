const specialtiesModel = require("../models/speciality_model")
const categoryModel = require("../models/category_model")

module.exports ={
    create: async (req, res)=>{
        const speciality = new specialtiesModel(req.body)
        const name = await specialtiesModel.findOne({name: speciality.name})
        if(name){
            res.status(406).json({message: "specialty exist"})
        }else{
            speciality.save(req.body, (err, item)=>{
                if(err){
                    res.status(406).json({message: "specialty not created"})
                }else{
                    categoryModel.findByIdAndUpdate(speciality.category, 
                        {$push: {specialties: speciality}}, ()=>{
                            res.status(201).json({message: "speciality created", data:item})
                        }
                        )
                }
            })
        }  
    },
    getAll: (req, res)=>{
        specialtiesModel.find({}, (err, items)=>{
            if(err){
                res.status(406).json({message: "no speciality found"})
            }else{
                res.status(201).json({message: "specialties list", data:items})
            }
        })
    },
    getByID: (req, res)=>{
        specialtiesModel.findById(req.params.id, (err, item)=>{
            if(err){
                res.status(406).json({message: "no speciality found"})
            }else{
                res.status(201).json({message: "speciality found", data:item})
            }
        })
    },
    getByCategory: (req, res)=>{
        specialtiesModel.find({category:req.params.id}, (err, items)=>{
            if(err){
                res.status(406).json({message: "no speciality found"})
            }else{
                res.status(201).json({message: "specialities found", data:items})
            }
        })
    },
    getByQuery: async(req, res)=>{
        let {q}= req.query 
        let specialties = await specialtiesModel.find({
            $or:[
                {name: {$regex: q, $options:"i"}},
                {description: {$regex: q, $options:"i"}}
            ]
        })
        res.status(201).json(specialties)
    },
    
    update: (req, res)=>{
        specialtiesModel.findByIdAndUpdate(req.params.id, req.body,{new:true}, (err, item)=>{
            if(err){
                res.status(406).json({message: "speciality not updated"})
            }else{
                res.status(201).json({message: "speciality updated", data: item})
            }
        })
    },
    
    deleteSpeciality: async (req, res)=>{
            try {
                const speciality = await specialtiesModel.findById({_id:req.params.id})
                await categoryModel.findByIdAndUpdate(speciality.category,
                    {$pull: {specialties: speciality._id}})
                await specialtiesModel.deleteOne({_id:req.params.id}) 
                res.status(201).json({message: "speciality deleted"})  
            } catch (error) {
                res.status(406).json(error)
            }
    }

}


