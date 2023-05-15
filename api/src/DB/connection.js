const {createPool} = require('mysql2/promise')

const conn = createPool({
    host:"sql10.freemysqlhosting.net",
    user:"sql10618112",
    password:"sp3KwJEUZD",
    port:"3306",
    database:"sql10618112"
})

module.exports = conn
