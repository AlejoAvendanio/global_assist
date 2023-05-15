const conn = require("../DB/connection")


const getGuest = async (_req,res)=>{
    try{
        const intoQuery = "SELECT * FROM Guest;"
        const [rows] = await conn.query(intoQuery)   
        console.log(rows) 
        res.status(200).send(rows)
    }catch(err){
        res.status(400).send({err})
    }

}

module.exports = {getGuest}