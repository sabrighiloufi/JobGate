const express = require("express")
const route = express.Router()
const upload = require("../middlewares/upload_files")
const companyController = require("../controllers/company_controller")
const verifyToken = require("../middlewares/verify_token")

route.post("/create", upload.single("photo"), companyController.create)
route.get("/getAll", companyController.getAll)
route.get("/getByID/:id", companyController.getByID)
route.get("/getByQuery", companyController.getByQuery)
route.put("/update/:id", upload.single("photo"), verifyToken, companyController.update)
route.delete("/delete/:id", companyController.deleteCompany)
route.get("/company-in-month", companyController.companyPerMonth)
route.get("/numberCompany", companyController.numberCompanies)
route.get("/popular-companies", companyController.popularCompany)

module.exports = route