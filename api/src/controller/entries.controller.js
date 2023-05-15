const conn = require("../DB/connection")




const postEntries = async(req,res)=>{
    console.log("hola")
    try{

        const {DoorId,FromDate,ToDate,GuestId} = req.query
        if(DoorId !== "undefined" && FromDate.length && ToDate.length  && GuestId!== "undefined" ){
            // const dateNow = new Date().toLocaleString()
            const intoQuery = `INSERT INTO Entries (guestid, doorid, fromdate,todate,created) VALUES ('${GuestId}', '${DoorId}', '${FromDate}','${ToDate}',NOW());`
            const [rows] = await conn.query(intoQuery)
            console.log(rows)
            if(rows.affectedRows){
                res.status(200).send(true)
            }else{
                res.status(500).send(false)
            }
        }else{
            res.status(401).send("missing data")
        }
    }catch(err){
        res.status(400).send("an error occurred")
    }
}

const deleteEntries =async (req,res)=>{
    const {id} = req.params
    console.log(id)
    const deleteQuery = `DELETE FROM Entries WHERE id = ${id};`
    try{
        const [result] = await conn.query(deleteQuery)
        console.log(result.affectedRows)
        if(result.affectedRows){
            res.status(200).send({result})
        }else{
            res.status(401).send("this entrie don't exist")
        }
    }catch(err){
        res.status(401).send(err)
    }
}

const getEntries = async (req,res)=>{
    const {page} = req.params
    const number = parseInt(page);
    try{
        const intoQuery = `SELECT Entries.*, Guest.firstname ,Guest.lastname, Door.description FROM Entries JOIN Guest ON Entries.guestid = Guest.id JOIN Door ON Entries.doorid = Door.id LIMIT ${(number - 1) * 10}, 10;`
        const [rows] = await conn.query(intoQuery)   
        console.log(rows) 
        res.status(200).send(rows)
    }catch(err){
        res.status(400).send({err})
    }
}

module.exports = {
    postEntries,
    deleteEntries,
    getEntries
}