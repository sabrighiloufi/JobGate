const express = require("express")
const route = express.Router()
const candidateController = require("../controllers/candidate_controller")
const upload = require("../middlewares/upload_files")

route.post("/create", upload.single("photo"), candidateController.create)
route.get("/getAll", candidateController.getAll)
route.get("/getByID/:id", candidateController.getByID)
route.get("/getByQuery", candidateController.getByQuery)
route.put("/update/:id", upload.single("photo"), candidateController.update)
route.delete("/delete/:id", candidateController.deleteCandidate)
route.get("/candidate-in-month", candidateController.candidatePerMonth)
route.get("/numberCandidates", candidateController.numberCandidates)

module.exports = route


