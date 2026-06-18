import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ active }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = user?.loggedIn;

  const isAdmin = localStorage.getItem("admin") === "true";

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">

      <div className="brand-box">
        <h2>🛡 Smart Fake Job Detector</h2>
        <p>AI-powered job fraud detection system</p>
      </div>

      <div className="nav-links">

        <Link className={active === "home" ? "active" : ""} to="/">
          Home
        </Link>
        <Link className={active === "about" ? "active" : ""} to="/about">
  About
</Link>

<Link className={active === "help" ? "active" : ""} to="/help">
  Help
</Link>

        {/* DASHBOARD */}
        <Link className={active === "dashboard" ? "active" : ""} to="/dashboard">
        
        </Link>

        {/* HISTORY (only for users) */}
        {isLoggedIn && (
          <Link to="/history">History</Link>
        )}

        {/* ADMIN */}
        {isAdmin && (
          <Link className={active === "admin" ? "active" : ""} to="/admin">
            Admin
          </Link>
        )}

        {/* LOGIN / LOGOUT */}
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register"></Link>
          </>
        ) : (
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        )}

      </div>
    </div>
  );
}