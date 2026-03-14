const express = require("express")
const router = express.Router()
const pool = require("../db")
const bcrypt = require("bcrypt")

router.post("/signup", async (req, res) => {

  const { name, email, password } = req.body

  try {

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await pool.query(
      "INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, email, hashedPassword, "user"]
    )

    res.json(result.rows[0])

  } catch (err) {

    if (err.code === "23505") {
      return res.status(400).json({ message: "Email already exists" })
    }

    console.error(err)
    res.status(500).json({ message: "Server error" })
  }

})

module.exports = router