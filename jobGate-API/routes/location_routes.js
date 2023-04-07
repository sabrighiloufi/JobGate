const express = require("express")
const route = express.Router()
const locationController = require("../controllers/location_controller")

route.post("/create",  locationController.create)
route.get("/getAll",  locationController.getAll)
route.get("/getByID/:id",  locationController.getByID)
route.get("/getByQuery",  locationController.getByQuery)
route.put("/update/:id",  locationController.update)
route.delete("/delete/:id",  locationController.deleteLocation)


module.exports = route