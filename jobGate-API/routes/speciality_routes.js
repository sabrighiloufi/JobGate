const express = require("express")
const route = express.Router()
const specialtiesController = require("../controllers/speciality_controller")

route.post("/create", specialtiesController.create)
route.get("/getAll", specialtiesController.getAll)
route.get("/getByID/:id", specialtiesController.getByID)
route.get("/getByQuery", specialtiesController.getByQuery)
route.put("/update/:id", specialtiesController.update)
route.delete("/delete/:id", specialtiesController.deleteSpeciality)
route.get("/getByCategory/:id", specialtiesController.getByCategory)

module.exports = route