const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")

const app = express()

app.use(cors())
app.use(express.json())

const pool = new Pool({
 user: "coreuser",
 host: "localhost",
 database: "coreinventory",
 password: "1234",
 port: 5432
})

module.exports = pool
