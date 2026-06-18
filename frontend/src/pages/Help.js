import Navbar from "../components/Navbar";

export default function Help() {
  return (
    <>
      <Navbar active="help" />

      <div className="hero">
        <h1 className="hero-title">
          <span className="icon">❓</span>
          <span className="gradient-text">Help & Support</span>
        </h1>

        <p className="hero-text">
          Learn how to use the system and understand results clearly.
        </p>
      </div>

      <div className="grid">

        <div className="home-card">
          <h2>How to Use</h2>
          <p>
            1. Go to Dashboard <br></br> 
            2. Paste job description <br></br> 
            3. Click Predict  <br></br>
            4. View AI result & advice  
          </p>
        </div>

        <div className="home-card">
          <h2>Result Meaning</h2>
          <p>
            🟢 Genuine → Safe to apply <br></br> 
            🟡 Suspicious → Verify before applying <br></br> 
            🔴 Fake → Avoid immediately  
          </p>
        </div>

        <div className="home-card">
          <h2>⚠ Common Scam Signs</h2>
          <p>
            - Asking money  <br></br>
            - Unrealistic salary <br></br> 
            - Urgent hiring pressure<br></br>  
            - No company details  <br></br>
          </p>
        </div>

        <div className="home-card">
          <h2>Support</h2>
          <p>
            If you face issues, contact system admin or try again later.
          </p>
        </div>

      </div>
    </>
  );
}