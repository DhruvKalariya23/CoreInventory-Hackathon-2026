const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const pool = require("./db")   // PostgreSQL connection
const authRoutes = require("./routes/auth")

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)


// LOGIN API
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if user exists
    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    )

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    const dbUser = user.rows[0]

    // Compare bcrypt password
    const validPassword = await bcrypt.compare(password, dbUser.password)

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    // Login success
    res.json({
      message: "Login successful",
      user: {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email
      }
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error. Please try again." })
  }
})

const nodemailer = require("nodemailer")
const otpStore = {} // temporary OTP store

app.post("/api/auth/forgot-password", async (req, res) => {
  const { email } = req.body

  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    )

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Email not found" })
    }

    const otp = Math.floor(1000 + Math.random() * 9000)

    otpStore[email] = otp
    console.log('email', email);
    console.log('otp', otp);

    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dkalariya90@gmail.com",
        pass: "yigp opfn znki vkxx"
      }
    })
    
    await transporter.sendMail({
        from: "dkalariya90@gmail.com",
        to: email,
        subject: "CoreInventory Password Reset OTP",
        text: `Your OTP is ${otp}`
    })

    res.json({ message: "OTP sent to email" })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

app.post("/api/auth/verify-otp", (req, res) => {
    const { email, otp } = req.body
  
    if (otpStore[email] && otpStore[email] == otp) {
      res.json({ message: "OTP verified" })
    } else {
      res.status(400).json({ message: "Invalid OTP" })
    }
  })

  app.post("/api/auth/reset-password", async (req, res) => {
    const { email, password } = req.body
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
  
      await pool.query(
        "UPDATE users SET password=$1 WHERE email=$2",
        [hashedPassword, email]
      )
  
      delete otpStore[email]
  
      res.json({ message: "Password updated successfully" })
  
    } catch (error) {
      res.status(500).json({ message: "Server error" })
    }
  })

    const productRoutes = require("./routes/product");

    app.use("/products", productRoutes);

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000")
})