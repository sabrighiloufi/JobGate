const express = require("express")
const route = express.Router()
const favoriteController = require("../controllers/favorite_controller")
const verifyToken = require("../middlewares/verify_token")

route.post("/create",verifyToken, favoriteController.create)
route.get("/getMyFavorites/:id",verifyToken ,favoriteController.getMyfavorites)
route.delete("/delete/:id",verifyToken ,favoriteController.deletefavorite)
route.delete("/deleteMyfavorites/:id",verifyToken ,favoriteController.deleteMyfavorites)

module.exports = route