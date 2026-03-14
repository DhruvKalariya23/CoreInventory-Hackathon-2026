import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "/src/css/login.css"

function ForgotPassword() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState(1)
  const [error, setError] = useState("")



  // ================= SEND OTP =================

  const sendOtp = async () => {

    setError("")

    if (!email) {
      setError("Email is required")
      return
    }

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setError(
          data.message ||
          "User not found. Please sign up first"
        )
        return
      }

      setStep(2)

    } catch (err) {
      setError("Server error")
    }

  }



  // ================= VERIFY OTP =================

  const verifyOtp = async () => {

    setError("")

    if (!otp) {
      setError("OTP is required")
      return
    }

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, otp })
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setError(
          data.message ||
          "Invalid OTP"
        )
        return
      }

      navigate("/reset-password", {
        state: { email }
      })

    } catch (err) {
      setError("Server error")
    }

  }



  return (

    <div className="login-container">

      <div className="login-wrapper">

        {/* LEFT */}
        <div className="form-section">

          <div className="form-container">

            {/* LOGO */}
            <div className="logo">
              <div className="logo-circle">D</div>
              DAILY
            </div>


            {/* STEP 1 */}

            {step === 1 && (
              <>
                <h2 className="heading">
                  Forgot password
                </h2>

                <p className="subheading">
                  Enter your email to receive OTP
                </p>


                <div className="form">

                  <div className="form-group">

                    <label>Email</label>

                    <input
                      className={`input ${error ? "error" : ""}`}
                      type="email"
                      placeholder="Enter your email"
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                    />

                    {error && (
                      <span className="error-text">
                        {error}
                      </span>
                    )}

                  </div>


                  <button
                    className="submit-btn"
                    onClick={sendOtp}
                  >
                    Send OTP
                  </button>

                </div>
              </>
            )}



            {/* STEP 2 */}

            {step === 2 && (
              <>
                <h2 className="heading">
                  Enter OTP
                </h2>

                <p className="subheading">
                  Check your email for OTP
                </p>


                <div className="form">

                  <div className="form-group">

                    <label>OTP</label>

                    <input
                      className={`input ${error ? "error" : ""}`}
                      type="text"
                      placeholder="Enter OTP"
                      onChange={(e) =>
                        setOtp(e.target.value)
                      }
                    />

                    {error && (
                      <span className="error-text">
                        {error}
                      </span>
                    )}

                  </div>


                  <button
                    className="submit-btn"
                    onClick={verifyOtp}
                  >
                    Verify OTP
                  </button>

                </div>
              </>
            )}

          </div>

        </div>



        {/* RIGHT SIDE */}

        <div className="analytics-section">

          <div className="analytics-content">

            <div className="analytics-text">

              <h2>
                Secure password recovery
              </h2>

              <p>
                Verify your identity using OTP and
                reset your password safely in DAILY
                inventory system.
              </p>

            </div>

          </div>

        </div>


      </div>

    </div>

  )

}

export default ForgotPassword