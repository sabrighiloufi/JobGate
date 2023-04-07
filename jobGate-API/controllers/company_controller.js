const companyModel = require("../models/company_model")
const mailController = require("./mail_controller")
const {randomBytes} = require("crypto")
const DOMAIN = process.env.DOMAIN
const PORT = process.env.PORT
const bcrypt = require("bcrypt")
const specialityModel = require("../models/speciality_model")

module.exports = {
    create : async (req, res) => {
        const salt = bcrypt.genSaltSync(10)
        const password = bcrypt.hashSync(req.body.password, salt)
        req.body.image = req.file.filename
        const company = new companyModel({...req.body, password, verificationCode: randomBytes(6).toString("hex")})
        const email = await companyModel.findOne({email: company.email})
        if(email){
            res.status(406).json({message: "email exist"})
        }else{
            company.save(req.body, async (err, item) => {
                if(err){
                    res.status(406).json({message: "company not created"})
                }else{
                    await specialityModel.findByIdAndUpdate(company.speciality, {$push: {companies: company}})
                    await mailController(company.email, "Welcome " + company.fullname, 
                        `<h2>Hello ${company.fullname}! </h2>
                        <p>We're glad to have you on board at ${company.email}. </p>
                        <p>We're glad to have you on board at JobGate</p>
                        <table class="action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative; -premailer-cellpadding: 0; -premailer-cellspacing: 0; -premailer-width: 100%; margin: 30px auto; padding: 0; text-align: center; width: 100%;">
                        <tr>
                        <td style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative;">
                        <a align="center" href="${DOMAIN}:${PORT}/auth/verify-email/${company.verificationCode}" class="button button-primary" target="_blank" rel="noopener" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative; -webkit-text-size-adjust: none; border-radius: 4px; color: #fff; display: inline-block; overflow: hidden; text-decoration: none; background-color: #2d3748; border-bottom: 8px solid #2d3748; border-left: 18px solid #2d3748; border-right: 18px solid #2d3748; border-top: 8px solid #2d3748;">Click here to Verify your account</a>
                        </td>
                        </tr>
                        </table>`,
                        [{
                            filename: req.file.filename,
                            path: "./storages/images/" + req.file.filename,
                            cid: "test"
                        }]
                    )
                    res.status(201).json({message: "company created", data: item})
                }
            })
        }
    },
    getAll: (req, res) => {
        companyModel.find({}).lean().exec( (err, items)=>{
            if(err){
                res.status(406).json({message: "no company found"})
            }else{
                res.status(201).json({message: "companies list", data: items})
            }
        })
    },
    getByID: (req, res) => {
        companyModel.findById(req.params.id, (err, item) => {
            if(err){
                res.status(406).json({message: "no company found"})
            }else{
                res.status(201).json({message: "company found", data: item})
            }
        })
    },
    getByQuery: async (req, res) => {
        let {q} = req.query 
        let companies = await companyModel.find({
            $or:[
                {fullname: {$regex: q, $options: "i"}},
                {description: {$regex: q, $options: "i"}},
            ]
        })
        res.status(200).json(companies)
    },
    update: (req, res) => {
        if(req.file){
            req.body.image = req.file.filename
        } 
        companyModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, item) => {
            if(err){
                res.status(406).json({message: "company not updated"})
            }else{
                res.status(201).json({message: "company updated", data: item})
            }
        })
    },
    deleteCompany: async (req, res) => {
        try {
            const company = await companyModel.findOne({_id: req.params.id})
            await specialityModel.findByIdAndUpdate(company.speciality, {$pull: {companies: company._id}})
            await companyModel.deleteOne({_id: company._id})
            res.status(201).json({message: "company deleted"})
        } catch (error) {
            res.status(406).json({message: "company not deleted"})
        }
    },
    numberCompanies:(req, res) => {
        companyModel.count({},(err, count) => {
            if(err){
                res.status(406).json({message: "error to count"})
            }else{
                res.status(200).json({message: "number of companies: ", data: count})
            }
        })
    },
    companyPerMonth: async (req, res)=>{
        const date = new Date()
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
        try {
            const data = await companyModel.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {$project: {month: {$month: "$createdAt"}}},
            {$group: {_id: "$month", total: {$sum: 1}}}
           ])
           const newData = data.sort((a, b) => a._id < b._id ? -1 : 1)
           res.status(200).json({data:newData})
        } catch (error) {
            res.status(406).json(error)
        }
        
    },
    popularCompany: async (req, res)=>{
        
        try {
            const data = await companyModel.aggregate([
                
                { "$addFields": { "number_offers": {$size: "$offers"} } },
                {$sort: {number_offers: -1}},
                
           ])
           
           res.status(200).json({data:data})
        } catch (error) {
            res.status(406).json(error)
        }
        
    }
} 