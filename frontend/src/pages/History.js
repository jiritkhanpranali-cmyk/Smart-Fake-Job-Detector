import { useEffect, useState } from "react";
import API from "../api";

export default function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/history").then((res) => setData(res.data));
  }, []);

  return (
    <div className="card">
      <h2>Prediction History</h2>

      {data.map((item, i) => (
        <div key={i} className="card">
          <p>{item.text}</p>
          <b>{item.result}</b>
          <p>{item.confidence}%</p>
        </div>
      ))}
    </div>
  );
}