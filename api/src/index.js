const express = require("express")
const cors = require("cors")
const entries =  require("./routes/entries.routes.js")
const guest =  require("./routes/guest.routes.js")
const door =  require("./routes/door.routes.js")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors());

app.use("/api",entries)
app.use("/api",guest)
app.use("/api",door)
app.listen(PORT,()=>{
    console.log("server runing on port "+ PORT)
})