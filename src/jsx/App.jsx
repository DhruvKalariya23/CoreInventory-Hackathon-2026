import { Routes, Route } from "react-router-dom"
import Signup from "./signup"
import Login from './login'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import Dashboard from "./Dashboard";
import Operations from "./Operations";
import MoveHistory from "./MoveHistory";
import Product from "./Product";
// import InventoryPage from "./InventoryPage";
// import Stock from "./Stock";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Operations" element={<Operations />} />
            <Route path="/MoveHistory" element={<Operations />} />
            <Route path="/products" element={<Product />} />
            {/* <Route path="/operations" element={<InventoryPage />} />
            <Route path="/history" element={<Stock />} /> */}
        </Routes>
    )
}

export default App