const express = require("express")
const route = express.Router()
const applicationController = require("../controllers/application_controller")

route.post("/create", applicationController.create)
route.get("/getAll", applicationController.getAll)
route.get("/getByID/:id", applicationController.getByID)
route.put("/update/:id", applicationController.update)
route.delete("/delete/:id", applicationController.deleteApplication)

module.exports = route