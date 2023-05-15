const express = require("express")
const { getDoor } = require( "../controller/door.controller")
const router = express.Router();


router
.get("/door",getDoor)

module.exports = router