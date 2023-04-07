const express = require("express")
const route = express.Router()
const subscriberController = require("../controllers/subscriber_controller")

route.post("/add", subscriberController.create)
route.get("/getAll", subscriberController.getAll)

module.exports = route