import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {

      // ADMIN LOGIN
      if (email === "admin@smartjob.com" && password === "admin123") {
        localStorage.setItem("admin", "true");
        localStorage.setItem("user", JSON.stringify({
          email,
          loggedIn: true,
          role: "admin"
        }));

        navigate("/admin");
        return;
      }

      // USER LOGIN
      const res = await API.post("/login", { email, password });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify({
          email,
          loggedIn: true,
          role: "user"
        }));

        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }

    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <>
      <Navbar active="login" />

      <div className="auth-container">
        <div className="card auth-card">

          <h2>Login</h2>

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn" onClick={loginUser}>
            Login
          </button>

          {/* ✅ FIXED REGISTER LINK */}
          <p>
            New user?{" "}
            <Link to="/register" style={{ color: "#00c6ff" }}>
              Register here
            </Link>
          </p>

        </div>
      </div>
    </>
  );
}