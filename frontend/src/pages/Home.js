import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar active="home" />

      <div className="hero">

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🛡 Smart Fake Job Detector
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="hero-text"
        >
          Detecting fake jobs before they detect you.
          AI-powered fraud detection for jobs, internships and even suspicious recruiter emails using scam pattern analysis,
          company verification signals, salary validation and risk intelligence.
          <br /><br />
          This system helps students and job seekers avoid scams, save time and apply only to trusted opportunities.
        </motion.p>

       

      </div>

      {/* FEATURES */}
      <div className="grid">

        <div className="home-card">
          <h2>Instant Detection</h2>
          <p>
            - Paste any job description, internship post, or recruiter message and get instant AI analysis in seconds.<br></br><br></br>
            - The system quickly scans text patterns, keywords and suspicious signals to give you a clear result without delay.
          </p>
        </div>

        <div className="home-card">
          <h2>Scam Protection</h2>
          <p>
            - Protects you from fake job offers, advance-fee scams, fake hiring emails and unrealistic salary promises.<br></br><br></br>
            - It highlights risky content so you can avoid fraud before sharing personal details or paying anything.
          </p>
        </div>

        <div className="home-card">
          <h2>Smart Risk Meter</h2>
          <p>
            - Gives a visual risk score (Fake / Suspicious / Genuine) so you can easily understand job safety.<br></br><br></br>
            - The meter helps you compare opportunities and make confident decisions without confusion.
          </p>
        </div>

        <div className="home-card">
          <h2>Student Friendly</h2>
          <p>
            - Designed specially for students, freshers and internship seekers who are most targeted by fake job scams.<br></br><br></br>
            - No technical knowledge required just paste and check.
          </p>
        </div>

      </div>

      {/* FREEMIUM PLAN */}
      <div className="grid">

        <div className="home-card">
          <h2>Free Users</h2>
          <p>
            Free users can test the system instantly without signup.<br></br>
            This helps you understand how the AI works before using full features.
          </p>
          <ul>
            <li>One Free Scan (No login required)</li>
            <li>Instant AI Prediction</li>
            <li>Basic Risk Result (Safe / Fake / Suspicious)</li>
          </ul>
        </div>

        <div className="home-card">
          <h2>Logged-in Users</h2>
          <p>
            - Registered users get full access to advanced AI features and detailed insights.<br></br>
            - Best for regular job seekers and students applying frequently.
          </p>
          <ul>
            <li>Unlimited Job / Internship Scans</li>
            <li>Advanced AI Confidence Score</li>
            <li>Smart Risk Dashboard</li>
            <li>Better decision support for career safety</li>
            <li>Future: Saved history & alerts (upgradable feature)</li>
          </ul>
        </div>

      </div>

      {/* PURPOSE / TRUST BLOCK */}
      <div className="grid">

        <div className="home-card" style={{ gridColumn: "1 / -1" }}>
          <h2>Why This System Matters</h2>
          <p>
            Every year, thousands of students and freshers lose time or money due to fake job postings and scam recruiters.<br></br>
            This system is built to solve that problem using AI-based text analysis.
            <br /><br />
            It helps you:
            <br />
            ✔ Verify job authenticity before applying  
            <br />
            ✔ Avoid scam emails and fake internships  
            <br />
            ✔ Save time by filtering unsafe opportunities  
            <br />
            ✔ Build confidence in your job search journey  
            <br /><br />
            Think of it as your personal AI career safety assistant.
          </p>
        </div>

      </div>

      {/* FOOTER */}
      <div className="footer">
        © 2026 Smart Fake Job Detector | Safe Jobs. Smart Choices.
      </div>
    </>
  );
}