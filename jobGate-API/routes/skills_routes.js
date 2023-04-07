const express = require("express")
const route = express.Router()
const skillsController = require("../controllers/skills_controller")

route.post("/create", skillsController.create)
route.get("/getAll", skillsController.getAll)
route.get("/getByID/:id", skillsController.getByID)
route.put("/update/:id", skillsController.updateSkills)
route.delete("/delete/:id", skillsController.deleteSkills)

module.exports = route