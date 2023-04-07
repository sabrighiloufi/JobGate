const express = require("express")
const route = express.Router()
const upload = require("../middlewares/upload_files")
const cvController = require("../controllers/cv_controller")

route.post("/create", upload.single("cv"), cvController.create)
route.get("/getMyCv/:id", cvController.getMyCv)
route.get("/getByID/:id", cvController.getCvByID)
route.put("/update/:id", upload.single("newCv"), cvController.updateMyCv) 
route.delete("/delete/:id", cvController.deleteMyCv)
route.get("/countcvs", cvController.numberCvs)

module.exports = route