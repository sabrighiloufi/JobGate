const express = require("express")
const route = express.Router()
const testController = require("../controllers/test_controller")

route.post("/create", testController.create)
route.get("/getByID/:id", testController.getByID)
route.put("/update/:id", testController.update)
route.delete("/delete/:id", testController.deleteTest)
route.put("/submit/:id", testController.submitTest)
 
module.exports = route