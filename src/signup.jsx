import { useState } from 'react'
import './signup.css'
import { useNavigate } from "react-router-dom"

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
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

    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the Terms & Conditions'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
  
    if (Object.keys(newErrors).length === 0) {
  
      try {
  
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        })
  
        const data = await response.json()
  
        if (response.ok) {
  
          setSubmitted(true)
  
          setTimeout(() => {
            setFormData({
              name: '',
              email: '',
              password: ''
            })
            setAgreeToTerms(false)
            setSubmitted(false)
  
            // Redirect after signup
            navigate("/dashboard")
  
          }, 1000)
  
        } else {
          alert(data.message)
        }
  
      } catch (error) {
        console.error("Signup error:", error)
      }
  
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className="container">
      <div className="signup-wrapper">
        {/* Left side - Form section */}
        <div className="form-section">
          <div className="form-container">
            {/* Logo */}
            <div className="logo">
              <div className="logo-circle">D</div>
              <span>DAILY</span>
            </div>

            <h1 className="heading">Create an account</h1>

            {submitted ? (
              <div className="success-box">
                <div className="success-icon">✓</div>
                <h3>Account created!</h3>
                <p>Welcome to DAILY</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="form">
                {/* Name field */}
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`input ${errors.name ? 'error' : ''}`}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                {/* Email field */}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your mail"
                    className={`input ${errors.email ? 'error' : ''}`}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                {/* Password field */}
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`input ${errors.password ? 'error' : ''}`}
                  />
                  {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                {/* Terms & Conditions checkbox */}
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeToTerms}
                    onChange={(e) => {
                      setAgreeToTerms(e.target.checked)
                      if (errors.terms) {
                        setErrors(prev => {
                          const newErrs = { ...prev }
                          delete newErrs.terms
                          return newErrs
                        })
                      }
                    }}
                    className="checkbox"
                  />
                  <label htmlFor="terms" className="checkbox-label">
                    I agree to all the Terms & Conditions
                  </label>
                </div>
                {errors.terms && <span className="error-text">{errors.terms}</span>}

                {/* Submit button */}
                <button type="submit" className="submit-btn">
                  Sign up
                </button>

                {/* Divider */}
                <div className="divider">
                  <span>Or</span>
                </div>

                {/* OAuth buttons */}
                <div className="oauth-buttons">
                  <button type="button" className="oauth-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <text x="6" y="18" fontSize="12" fontWeight="bold" fill="#4285F4">G</text>
                    </svg>
                    <span>Google</span>
                  </button>
                  <button type="button" className="oauth-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </button>
                </div>

                {/* Login link */}
                <p className="login-link">
                  Already have an account? 
                  <a onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
                    Log in
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Right side - Analytics panel */}
        <div className="analytics-section">
          <div className="analytics-content">
            {/* Analytics mockup */}
            <div className="analytics-cards">
              <div className="chart-card">
                <div className="chart-header">
                  <h3>Analytics</h3>
                  <div className="chart-tabs">
                    <button className="tab active">Weekly</button>
                    <button className="tab">Monthly</button>
                    <button className="tab">Yearly</button>
                  </div>
                </div>
                
                {/* Chart placeholder */}
                <div className="chart-placeholder">
                  <svg viewBox="0 0 100 50" preserveAspectRatio="none">
                    <path d="M0,40 Q25,30 50,25 T100,20" stroke="#3b82f6" strokeWidth="1.5" fill="none"/>
                    <path d="M0,35 Q25,20 50,15 T100,10" stroke="#60a5fa" strokeWidth="1.5" fill="none"/>
                    <path d="M0,45 Q25,35 50,30 T100,28" stroke="#93c5fd" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>

                <div className="chart-labels">
                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THU</span>
                </div>
              </div>

              {/* Pie chart mockup */}
              <div className="pie-card">
                <div className="pie-chart">
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#0d5568" strokeWidth="8" 
                            strokeDasharray="75.36 251.2" strokeDashoffset="0"
                            strokeLinecap="round" style={{transform: 'rotate(-90deg)', transformOrigin: '50% 50%'}}/>
                  </svg>
                  <div className="pie-text">
                    <span className="percentage">42%</span>
                    <span className="total">Total</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text content */}
            <div className="analytics-text">
              <h2>Very simple way you can engage</h2>
              <p>Welcome to DAILY Inventory Management System Efficiently track<br/>and manage your inventory with ease.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
