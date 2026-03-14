import { Routes, Route } from "react-router-dom"
import Signup from "./signup"
import Login from './login'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import Dashboard from "./Dashboard"

function App() {
    return (
        <Routes>
            {/* <Route path="/" element={<Signup />} /> */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    )
}

export default App