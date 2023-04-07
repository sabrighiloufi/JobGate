const express = require("express")
const route = express.Router()
const offersController = require("../controllers/offer_controller")
const verifyToken = require("../middlewares/verify_token")

route.post("/create",  offersController.create)
route.get("/getAll", offersController.getAll)
route.get("/getByID/:id", offersController.getByID)
route.get("/getByQuery", offersController.getByQuery)
route.put("/update/:id", offersController.update)
route.delete("/delete/:id", offersController.deleteOffer)
route.get("/OffersPerMonth", offersController.offersPerMonth)
route.get("/OffersPerSpeciality", offersController.offersPerSpeciality)
route.get("/numberOffers", offersController.numberOffers)
route.get("/Offers-last-month", offersController.offersLastMonth)
 
 
module.exports = route
