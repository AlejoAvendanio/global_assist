const conn = require("../DB/connection")


const getDoor = async (_req,res)=>{
    try{
        const intoQuery = "SELECT * FROM Door;"
        const [rows] = await conn.query(intoQuery)   
        console.log(rows) 
        res.status(200).send(rows)
    }catch(err){
        res.status(400).send({err})
    }

}

module.exports = {getDoor}