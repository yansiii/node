const express = require("express")
const route = express.Router()
const ExtraCatSchema = require("../Controllers/ExtraCtl")

route.get("/ExtraSubAddCat",ExtraCatSchema.ExtraAddCatData)
route.post("/SendExtraCat",ExtraCatSchema.SendExtraCat)
route.get("/ExtraSubViewCat",ExtraCatSchema.ViewExtraCat)


module.exports = route;