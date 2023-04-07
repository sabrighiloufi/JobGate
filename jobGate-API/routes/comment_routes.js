const express = require("express")
const route = express.Router()
const commentController = require("../controllers/comment_controller")

route.post("/create", commentController.create)
route.get("/getAll", commentController.getAll)
route.get("/getByID/:id", commentController.getByID)
route.get("/getByQuery", commentController.getByQuery)
route.put("/update/:id", commentController.update)
route.delete("/delete/:id", commentController.deleteComment)

module.exports = route