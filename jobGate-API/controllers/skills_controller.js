const skillsModel = require("../models/skills_model")
const specialtiesModel = require("../models/speciality_model")

module.exports = {
     create: async(req, res) => {
        const skill = new skillsModel(req.body)
        skill.save(req.body, async (err, item) => {
            if(err){
                res.status(406).json({message: "skills not created"})
            }else{
                await specialtiesModel.findByIdAndUpdate(skill.speciality, {$push: {skills: skill}})
                res.status(201).json({message: "skills created", data: item}) 
            }
        }) 
  
    },
    getAll: (req, res) => {
        skillsModel.find({}, (err, skills) => {
            if(err){
                res.status(406).json({message: "no skills found"})
            }else{
                res.status(200).json({message: "skills :", data: skills})
            }
        })
    },
    getByID:(req, res) => {
        skillsModel.findById(req.params.id, (err, skills) => {
            if(err){
                res.status(406).json({message: "skills not found"})
            }else{
                res.status(200).json({message: "skills found", data: skills})
            }
        })
    },
    updateSkills:(req, res) => {
        skillsModel.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, skills) => {
            if(err){
                res.status(406).json({message: "skills not updated"})
            }else{
                res.status(200).json({message: "skills updated", data: skills})
            }
        })
    },
    deleteSkills: async (req, res) => {
        try {
            const skills = await skillsModel.findOne({_id: req.params.id})
            await specialtiesModel.findByIdAndUpdate(skills.speciality, {$pull: {skills: skills._id}})
            await skills.deleteOne({_id: skills._id})
            res.status(200).json({message: "skills deleted"})
        } catch (error) {
            res.status(406).json(error)
        }
    }

}