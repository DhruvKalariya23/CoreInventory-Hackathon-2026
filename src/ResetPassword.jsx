import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function ResetPassword() {

  const navigate = useNavigate()
  const location = useLocation()

  const email = location.state?.email

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const resetPassword = async () => {

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    await fetch("http://localhost:5000/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })

    alert("Password reset successful")

    navigate("/login")
  }

  return (
    <div>

      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button onClick={resetPassword}>
        Reset Password
      </button>

    </div>
  )
}

export default ResetPassword