const express = require("express")
const contractTypes_controller = require("../controllers/contractTypes_controller")
const route = express.Router()
const contractController = require("../controllers/contractTypes_controller")

route.post("/create", contractController.create)
route.get("/getAll", contractTypes_controller.getAll)
route.get("/getByID/:id", contractTypes_controller.getByID)
route.put("/update/:id", contractTypes_controller.updateContract)
route.delete("/delete/:id", contractTypes_controller.deletecontract)

module.exports = route