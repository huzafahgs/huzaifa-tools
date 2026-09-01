import { useState, useEffect } from "react";
import "../styles/Tool.css";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const start = () => setRunning(true);
  const stop = () => setRunning(false);
  const reset = () => {
    setTime(0);
    setRunning(false);
    setLaps([]);
  };
  const addLap = () => setLaps([...laps, time]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setTime(t => t + 10), 10);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>⏱️ Stopwatch</h1>
        <p>Track your time precisely</p>
      </div>

      <div className="time-display">{formatTime(time)}</div>

      <div className="time-controls">
        <button className="tool-button" onClick={start} disabled={running}>Start</button>
        <button className="tool-button" onClick={stop} disabled={!running}>Stop</button>
        <button className="tool-button" onClick={addLap} disabled={!running}>Lap</button>
        <button className="tool-button" onClick={reset}>Reset</button>
      </div>

      {laps.length > 0 && (
        <div>
          <h3 style={{color: "gold", marginBottom: "15px"}}>Laps</h3>
          <div style={{maxHeight: "300px", overflowY: "auto"}}>
            {laps.map((lap, i) => (
              <div key={i} className="result-item">
                <span className="result-label">Lap {i + 1}</span>
                <span className="result-value">{formatTime(lap)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
