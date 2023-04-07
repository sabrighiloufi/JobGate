const express = require("express")
const route = express.Router()
const adminController = require("../controllers/admin_controller")
const upload = require("../middlewares/upload_files")
const verifyToken = require("../middlewares/verify_token")

route.post("/create", upload.single("photo"), adminController.create)
route.get("/getAll", adminController.getAll)
route.get("/getByID/:id", adminController.getByID)
route.get("/getByQuery", adminController.getByQuery)
route.put("/update/:id", verifyToken, upload.single("photo"), adminController.update)
route.delete("/delete/:id", verifyToken, adminController.deleteAdmin)
route.post("/contact",  adminController.ContactAdmin)

module.exports = route