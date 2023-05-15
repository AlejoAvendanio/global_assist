const express = require("express");
const { getGuest } = require("../controller/guest.controller");
const router = express.Router();


router
.get("/guest",getGuest)

module.exports = router