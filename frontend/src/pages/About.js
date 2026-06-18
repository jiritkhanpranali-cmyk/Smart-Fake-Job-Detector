import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      <Navbar active="about" />

      <div className="hero">
        <h1 className="hero-title">
          <span className="icon">ℹ️</span>
          <span className="gradient-text">About System</span>
        </h1>

        <p className="hero-text">
          Smart Fake Job Detector is an AI-based system designed to protect
          students and job seekers from fake job postings, scam recruiters,
          and fraudulent internship offers.
        </p>
      </div>

      <div className="grid">

        <div className="home-card">
          <h2>Our Mission</h2>
          <p>
            To create a safe job searching environment by using AI to detect
            scam patterns and prevent users from falling into fraud traps.
          </p>
        </div>

        <div className="home-card">
          <h2> How It Works</h2>
          <p>
            The system analyzes job descriptions using Machine Learning,
            checking for suspicious keywords, unrealistic salaries,
            and fraud patterns to classify jobs as Genuine, Fake, or Suspicious.
          </p>
        </div>

        <div className="home-card">
          <h2>Why It Matters</h2>
          <p>
            Many students lose money or time due to fake jobs.
            This system acts as a safety layer before you apply.
          </p>
        </div>

      </div>
    </>
  );
}