const { Client } = require("pg")

async function createDatabase() {
  const client = new Client({
    user: "postgres",
    host: "localhost",
    password: "postgres",
    port: 5432,
    database: "postgres" // connect to default db first
  })

  await client.connect()

  const res = await client.query(
    "SELECT 1 FROM pg_database WHERE datname='coreinventory'"
  )

  if (res.rowCount === 0) {
    console.log("Creating database coreinventory...")
    await client.query("CREATE DATABASE coreinventory")
    console.log("Database created successfully")
  } else {
    console.log("Database already exists")
  }

  await client.end()
}

module.exports = createDatabase