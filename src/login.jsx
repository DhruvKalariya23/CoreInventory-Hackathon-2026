import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
  
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        })
  
        const data = await response.json()
  
        if (response.ok) {
          // login success
          setSubmitted(true)
  
          // optional: store token
          localStorage.setItem("token", data.token)
  
          setTimeout(() => {
            navigate("/dashboard")
          }, 1000)
  
        } else {
          // login failed
          setErrors({ password: data.message || "Invalid email or password" })
        }
  
      } catch (error) {
        console.error(error)
        setErrors({ password: "Server error. Please try again." })
      }
  
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">

        {/* Left side - Form section */}
        <div className="form-section">
          <div className="form-container">

            {/* Logo */}
            <div className="logo">
              <div className="logo-circle">D</div>
              <span>DAILY</span>
            </div>

            <h1 className="heading">Welcome back</h1>

            {submitted ? (
              <div className="success-box">
                <div className="success-icon">✓</div>
                <h3>Login successful!</h3>
                <p>Redirecting to dashboard...</p>
              </div>
            ) : (

              <form onSubmit={handleSubmit} className="form">

                {/* Email */}
                <div className="form-group">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your mail"
                    className={`input ${errors.email ? 'error' : ''}`}
                  />

                  {errors.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>


                {/* Password */}
                <div className="form-group">
                  <label>Password</label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`input ${errors.password ? 'error' : ''}`}
                  />

                  {errors.password && (
                    <span className="error-text">{errors.password}</span>
                  )}
                </div>


                {/* Forgot Password */}
                <div className="forgot-password">
                    <a
                        onClick={() => navigate('/forgot-password')}
                        style={{ cursor: 'pointer' }}
                    >
                        Forgot Password?
                    </a>
                </div>


                {/* Login Button */}
                <button type="submit" className="submit-btn">
                  Log in
                </button>


                {/* Divider */}
                <div className="divider">
                  <span>Or</span>
                </div>


                {/* OAuth */}
                <div className="oauth-buttons">

                  <button type="button" className="oauth-btn">
                    <span>Google</span>
                  </button>

                  <button type="button" className="oauth-btn">
                    <span>Facebook</span>
                  </button>

                </div>


                {/* Signup link */}
                <p className="signup-link">
                    Don't have an account?{" "}
                    <a onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>
                        Sign up
                    </a>
            </p>

              </form>

            )}
          </div>
        </div>


        {/* Right side panel */}
        <div className="analytics-section">
          <div className="analytics-content">

            <div className="analytics-text">
              <h2>Very simple way you can engage</h2>

              <p>
                Welcome to DAILY Inventory Management System
                Efficiently track and manage your inventory with ease.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Login