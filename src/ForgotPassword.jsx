import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ForgotPassword() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState(1)

  const sendOtp = async () => {
    await fetch("http://localhost:5000/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    })

    setStep(2)
  }

  const verifyOtp = async () => {
    const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
    })

    if (res.ok) {
      navigate("/reset-password", { state: { email } })
    }
  }

  return (
    <div>

      {step === 1 && (
        <>
          <h2>Forgot Password</h2>

          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Enter OTP</h2>

          <input
            type="text"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />

          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

    </div>
  )
}

export default ForgotPassword