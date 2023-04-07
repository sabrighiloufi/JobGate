const express = require("express")
const app = express()
const cors = require("cors")


const database = require("./config/database")
const mailSchedule = require("./scheduling-jobs/daily_mail")

const dotenv = require("dotenv")
dotenv.config()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

const morgan = require("morgan")
app.use(morgan("tiny"))
 
const offerRoutes = require("./routes/offer_routes")
app.use("/offers", offerRoutes)

const specialityRoutes = require("./routes/speciality_routes")
app.use("/specialties", specialityRoutes)

const categoryRoutes = require("./routes/category_routes")
app.use("/categories", categoryRoutes)

const commentRoutes = require("./routes/comment_routes")
app.use("/comments", commentRoutes)

const adminRoutes = require("./routes/admin_routes")
app.use("/admins", adminRoutes)

const companyRoutes = require("./routes/company_routes")
app.use("/companies", companyRoutes)

const candidateRoutes = require("./routes/candidate_routes")
app.use("/candidates", candidateRoutes)

const authRoutes = require("./routes/auth_routes")
app.use("/auth", authRoutes)

const testRoutes = require("./routes/test_routes")
app.use("/tests", testRoutes)

const applicationRoutes = require("./routes/application_routes")
app.use("/applications", applicationRoutes)

const favoriteRoutes = require("./routes/favorite_routes")
app.use("/favorites", favoriteRoutes)

const cvRoutes = require("./routes/cv_routes")
app.use("/cvs", cvRoutes)

const CTRoutes = require("./routes/contractTypes_routes")
app.use("/contracts", CTRoutes)

const skillsRoutes = require("./routes/skills_routes")
app.use("/skills", skillsRoutes)

const locationRoutes = require("./routes/location_routes")
app.use("/locations", locationRoutes)

const subscriberRoutes = require("./routes/subscriber_routes")
app.use("/subscribers", subscriberRoutes)

app.get("/getImage/:img", (req, res)=>{
    res.sendFile(__dirname + "/storages/images/" + req.params.img)
})
app.get("/getPdf/:pdf", (req, res)=>{
    res.sendFile(__dirname + "/storages/cvs/" + req.params.pdf)
})


app.listen(PORT, (err)=>{
    if(err){
        console.log("server not runned")
    }else{
        console.log(`server running on http://localhost:${PORT}`)
    }
})
