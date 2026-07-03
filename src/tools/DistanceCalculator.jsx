import { useState } from "react";
import "../styles/Tool.css";

export default function DistanceCalculator() {
  const [lat1, setLat1] = useState("");
  const [lon1, setLon1] = useState("");
  const [lat2, setLat2] = useState("");
  const [lon2, setLon2] = useState("");
  const [result, setResult] = useState(null);

  const calculateDistance = () => {
    if (!lat1 || !lon1 || !lat2 || !lon2) {
      alert("Please enter all coordinates!");
      return;
    }

    const toRad = (degrees) => (degrees * Math.PI) / 180;
    const R = 6371; // Earth's radius in km

    const φ1 = toRad(parseFloat(lat1));
    const φ2 = toRad(parseFloat(lat2));
    const Δφ = toRad(parseFloat(lat2) - parseFloat(lat1));
    const Δλ = toRad(parseFloat(lon2) - parseFloat(lon1));

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    const distanceMiles = distance * 0.621371;

    setResult({
      km: distance.toFixed(2),
      miles: distanceMiles.toFixed(2)
    });
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>📍 Distance Calculator</h1>
        <p>Calculate distance between coordinates (Haversine formula)</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Latitude 1</label>
          <input
            type="number"
            value={lat1}
            onChange={(e) => setLat1(e.target.value)}
            placeholder="-90 to 90"
            step="0.0001"
          />
        </div>
        <div className="form-group">
          <label>Longitude 1</label>
          <input
            type="number"
            value={lon1}
            onChange={(e) => setLon1(e.target.value)}
            placeholder="-180 to 180"
            step="0.0001"
          />
        </div>
        <div className="form-group">
          <label>Latitude 2</label>
          <input
            type="number"
            value={lat2}
            onChange={(e) => setLat2(e.target.value)}
            placeholder="-90 to 90"
            step="0.0001"
          />
        </div>
        <div className="form-group">
          <label>Longitude 2</label>
          <input
            type="number"
            value={lon2}
            onChange={(e) => setLon2(e.target.value)}
            placeholder="-180 to 180"
            step="0.0001"
          />
        </div>
      </div>

      <button className="tool-button" onClick={calculateDistance} style={{width: "100%", marginBottom: "30px"}}>
        Calculate Distance
      </button>

      {result && (
        <div className="result-box">
          <div className="result-item">
            <span className="result-label">Distance (km)</span>
            <span className="result-value">{result.km}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Distance (miles)</span>
            <span className="result-value">{result.miles}</span>
          </div>
        </div>
      )}
    </div>
  );
}
