import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";
import { PieChart, Pie, Cell } from "recharts";

export default function Dashboard() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = user && user.loggedIn;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const checkJob = async () => {
    const hasUsedFree = localStorage.getItem("freeUsed");

    if (!isLoggedIn && hasUsedFree) {
      alert("Free trial used. Please login.");
      return;
    }

    if (!text.trim()) {
      alert("Please enter job description");
      return;
    }

    try {
      const res = await API.post("/predict", { text });
      setResult(res.data);

      if (!isLoggedIn && !hasUsedFree) {
        localStorage.setItem("freeUsed", "true");
      }
    } catch {
      alert("Server error. Please try again.");
    }
  };

  const data = result
    ? [
        { name: "Genuine", value: result.genuine_probability },
        { name: "Fake", value: result.fake_probability }
      ]
    : [];

  const COLORS = ["#22c55e", "#ef4444"];

  const getAdvice = () => {
    if (!result) return "";

    if (result.result === "Fake Job") {
      return `❌ Avoid this job.

- Fake or unverified company signals detected
- Salary may be unrealistic
- Scam patterns found

Do NOT apply.`;
    }

    if (result.result === "Suspicious") {
      return `⚠ Be careful.

- Missing verification
- Possible scam patterns

 Verify before applying.`;
    }

    return `✅ Safe Job.

- No scam detected
- Professional listing

You can apply safely.`;
  };

  return (
    <>
      <Navbar active="dashboard" />

      {/* ROW 1 */}
      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h2>Paste Job Description</h2>

          <textarea
            placeholder="Paste job description..."
            onChange={(e) => setText(e.target.value)}
          />

          <button className="btn" onClick={checkJob}>
            Predict
          </button>
        </div>

        <div className="dashboard-card">
          <h2>AI Analysis</h2>

          {result ? (
            <>
              <h3
                className={
                  result.result === "Fake Job"
                    ? "red"
                    : result.result === "Suspicious"
                    ? "yellow"
                    : "green"
                }
              >
                {result.result}
              </h3>
              <p>Confidence: {result.confidence}%</p>
            </>
          ) : (
            <p>Run prediction to see results</p>
          )}
        </div>
      </div>

      {/* ROW 2 */}
      <div className="ai-risk-grid">

        <div className="dashboard-card">
          <h2>Risk Meter</h2>

          {result && (
            <PieChart width={300} height={260}>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={95}
                label
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          )}
        </div>

        <div className="dashboard-card">
          <h2>AI Career Advice</h2>

          {result ? (
            <pre>{getAdvice()}</pre>
          ) : (
            <p>Run prediction to see guidance</p>
          )}
        </div>

      </div>
    </>
  );
}