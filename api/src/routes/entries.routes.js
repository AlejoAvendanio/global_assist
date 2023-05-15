const express = require("express")
const { deleteEntries, postEntries, getEntries } = require( "../controller/entries.controller")
const router = express.Router();


router
.get("/entries",postEntries)
.delete("/entries/delete/:id",deleteEntries)
.get("/entries/all/:page",getEntries)

module.exports = router