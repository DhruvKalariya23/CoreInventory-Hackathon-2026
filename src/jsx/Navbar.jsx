import "../css/navbar.css"
import { Link, useLocation } from "react-router-dom";   // ✅ ADD THIS

function Navbar() {

  const location = useLocation();   // ✅ ADD THIS

  return (

    <div className="navbar">

      {/* LEFT */}
      <div className="nav-left">

        <div className="logo-box"></div>

        <div className="logo">
            <span>Inventory</span>
        </div>

        <div className="menu">

            <Link to="/dashboard">
                <span className={location.pathname === "/dashboard" ? "active" : ""}>
                Dashboard
                </span>
            </Link>

            <Link to="/operations">
                <span className={location.pathname === "/operations" ? "active" : ""}>
                Operations
                </span>
            </Link>

            <Link to="/products">
                <span className={location.pathname === "/products" ? "active" : ""}>
                Products
                </span>
            </Link>

            {/* <Link to="/history">
                <span className={location.pathname === "/history" ? "active" : ""}>
                Move History
                </span>
            </Link>

            <Link to="/settings">
                <span className={location.pathname === "/settings" ? "active" : ""}>
                Settings
                </span>
            </Link> */}

        </div>

      </div>

      {/* CENTER */}
      <div className="nav-center">

        <input
          className="search"
          placeholder="Search..."
        />

      </div>

      {/* RIGHT */}
      <div className="nav-right">

        <div className="icon">
          🔔
          <span className="badge">5</span>
        </div>

        <div className="company">
          My Company (San Francisco)
        </div>

        <div className="profile">
          A
        </div>

      </div>

    </div>

  )
}

export default Navbar