const candidateModel = require("../models/candidate_model")
const mailController = require("./mail_controller")
const {randomBytes} = require("crypto")
const DOMAIN = process.env.DOMAIN
const PORT = process.env.PORT
const bcrypt = require("bcrypt")

module.exports = {
    create: async (req, res) => {
        const salt = bcrypt.genSaltSync(10)
        const password = bcrypt.hashSync(req.body.password, salt)
        if(req.file){
            req.body.image = req.file.filename
        }
        const candidate = new candidateModel({...req.body, password, verificationCode: randomBytes(6).toString("hex")})
        const email = await candidateModel.findOne({email: candidate.email})
        if(email){
            res.status(406).json({message: "email exist"})
        }else{
            candidate.save(req.body, (err, item) => {
                if(err){
                    res.status(406).json({message: "candidate not created"})
                }else{
                    mailController(candidate.email, "Welcome " + candidate.fullname, 
                        `<h2>Hello ${candidate.fullname}! </h2>
                        <p>We're glad to have you on board at ${candidate.email}. </p>
                        <p>We're glad to have you on board at JobGate</p>
                        <table class="action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative; -premailer-cellpadding: 0; -premailer-cellspacing: 0; -premailer-width: 100%; margin: 30px auto; padding: 0; text-align: center; width: 100%;">
                        <tr>
                        <td style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative;">
                        <a align="center" href="${DOMAIN}:${PORT}/auth/verify-email/${candidate.verificationCode}" class="button button-primary" target="_blank" rel="noopener" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative; -webkit-text-size-adjust: none; border-radius: 4px; color: #fff; display: inline-block; overflow: hidden; text-decoration: none; background-color: #2d3748; border-bottom: 8px solid #2d3748; border-left: 18px solid #2d3748; border-right: 18px solid #2d3748; border-top: 8px solid #2d3748;">Click here to Verify your account</a>
                        </td>
                        </tr>
                        </table>`
                    )
                    res.status(201).json({message: "candidate created", data: item})
                }
            })
        }
    },
    getAll: (req, res) => {
        candidateModel.find({}, (err, items) => {
            if(err){
                res.status(406).json({message: "no candidate found"})
            }else{
                res.status(201).json({message: "candidates list ", data: items})
            }
        })
    },
    getByID: (req, res) => {
        candidateModel.findById(req.params.id, (err, item) => {
            if(err){
                res.status(406).json({message: "no candidate found"})
            }else{
                res.status(201).json({message: "candidate found", data: item})
            }
        })
    },
    getByQuery: async (req, res) => {
        let {q} = req.query 
        let candidates = await candidateModel.find({
            $or:[
                {fullname: {$regex: q, $options: "i"}}
            ]
        })
        res.status(200).json(candidates)
    },
    update: (req, res) => {
        if(req.file){
            req.body.image = req.file.filename
        }
        candidateModel.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, item) => {
            if(err){
                res.status(406).json({message: "candidate not updated"})
            }else{
                res.status(200).json({message: "candidate updated", data: item})
            }
        })
    },
    deleteCandidate: async (req, res) => {
        const candidate = await candidateModel.findOne({_id: req.params.id})
        if(!candidate){
            res.status(406).json({message: "candidate not found"})
        }else{
            candidateModel.findByIdAndRemove(req.params.id, (err) => {
                if(err){
                    res.status(406).json({message: "candidate not deleted"})
                }else{
                    res.status(200).json({message: "candidate deleted"})
                }
            })
        }
    },
    candidatePerMonth: async (req, res)=>{
        const date = new Date()
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
        try {
            const data = await candidateModel.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {$project: {month: {$month: "$createdAt"}}},
            {$group: {_id: "$month", total: {$sum: 1}}}
           ])
           const newData = data.sort((a, b) => a._id < b._id ? -1 : 1)
           res.status(200).json(newData)
        } catch (error) {
            res.status(406).json(error)
        } 
    },
    numberCandidates:(req, res) => {
        candidateModel.count({},(err, count) => {
            if(err){
                res.status(406).json({message: "error to count"})
            }else{
                res.status(200).json({message: "number of candidate: ", data: count})
            }
        })
    }
}