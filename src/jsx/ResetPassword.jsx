import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "/src/css/login.css"

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

    <div className="login-container">

      <div className="login-wrapper">

        {/* LEFT */}
        <div className="form-section">

          <div className="form-container">

            <div className="logo">
              <div className="logo-circle">D</div>
              DAILY
            </div>

            <h2 className="heading">Reset password</h2>

            <p className="subheading">
              Enter new password
            </p>

            <div className="form">

              <div className="form-group">
                <label>New password</label>
                <input
                  className="input"
                  type="password"
                  placeholder="New password"
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Confirm password</label>
                <input
                  className="input"
                  type="password"
                  placeholder="Confirm password"
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                />
              </div>

              <button
                className="submit-btn"
                onClick={resetPassword}
              >
                Reset Password
              </button>

            </div>

          </div>

        </div>


        {/* RIGHT */}
        <div className="analytics-section">

          <div className="analytics-content">

            <div className="analytics-text">
              <h2>Password security</h2>
              <p>
                Use a strong password to keep your
                DAILY inventory account secure.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>

  )
}

export default ResetPassword