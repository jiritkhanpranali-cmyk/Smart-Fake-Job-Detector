import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = async () => {
    try {
      if (!name || !email || !password || !confirmPassword) {
        alert("Please fill all fields");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const res = await API.post("/register", {
        name,
        email,
        password
      });

      alert(res.data.message);

      // redirect to login after successful registration
      navigate("/login");

    } catch (error) {
      alert(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <>
      <Navbar active="login" />

     <div className="auth-container">

        <div className="card auth-card">

          <h2>Create Your Account</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="btn full-btn" onClick={registerUser}>
            Sign Up
          </button>

          {/* FIXED LOGIN LINK (as you requested) */}
          <p className="auth-text">
            Already have an account?{" "}
           <Link to="/login" className="register-link" style={{ color: "#00c6ff" }}>
             Login Here
           </Link>
          </p>

        </div>

      </div>
    </>
  );
}