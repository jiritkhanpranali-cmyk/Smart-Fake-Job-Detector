import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin");

    if (isAdmin !== "true") {
      navigate("/login");
      return;
    }

    loadStats();
  }, [navigate]);

  const loadStats = async () => {
    try {
      const res = await API.get("/admin/stats");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutAdmin = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  const pieData = [
    { name: "Fake", value: stats.fake_jobs || 0 },
    { name: "Suspicious", value: stats.suspicious_jobs || 0 },
    { name: "Genuine", value: stats.genuine_jobs || 0 }
  ];

  const barData = [
    { name: "Fake", jobs: stats.fake_jobs || 0 },
    { name: "Suspicious", jobs: stats.suspicious_jobs || 0 },
    { name: "Genuine", jobs: stats.genuine_jobs || 0 }
  ];

  const COLORS = ["#ef4444", "#facc15", "#22c55e"];

  return (
    <>
      <Navbar active="admin" />

      <div className="hero">
        <h1 className="hero-title">
  <span className="icon">📈</span>
  <span className="gradient-text">Admin Dashboard</span>
</h1>
        <p className="hero-text">
          Live analytics of AI predictions and fraud detection activity.
        </p>

        <button className="btn" onClick={logoutAdmin}>
          Logout Admin
        </button>
      </div>

      {/* TOP STATS */}
     <div className="admin-stats-grid">

        <div className="admin-card">
          <h2>Total Predictions</h2>
          <h1>{stats.total_predictions || 0}</h1>
        </div>

        <div className="admin-card">
          <h2>Fake Jobs</h2>
          <h1 className="red">{stats.fake_jobs || 0}</h1>
        </div>

        <div className="admin-card">
          <h2>Suspicious</h2>
          <h1 className="yellow">{stats.suspicious_jobs || 0}</h1>
        </div>

        <div className="admin-card">
          <h2>Genuine Jobs</h2>
          <h1 className="green">{stats.genuine_jobs || 0}</h1>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid">

        <div className="admin-card">
          <h2>Detection Ratio</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="admin-card">
          <h2>Prediction Analytics</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jobs" fill="#00c6ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* INSIGHTS */}
      <div className="admin-card about-card">
        <h2>AI Insights</h2>

        <ul>
          <li>✔ Genuine jobs are increasing this week</li>
          <li>⚠ Fake jobs detected with urgency scam keywords</li>
          <li>📈 Prediction traffic growing steadily</li>
          <li>🛡 System protecting users from fraudulent listings</li>
        </ul>
      </div>
    </>
  );
}