import { useState, useEffect } from "react";
import "../styles/Tool.css";

export default function Timer() {
  const [inputMinutes, setInputMinutes] = useState("");
  const [inputSeconds, setInputSeconds] = useState("");
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  const start = () => {
    if (time > 0) setRunning(true);
  };

  const stop = () => setRunning(false);

  const setTimer = () => {
    const total = (parseInt(inputMinutes) || 0) * 60 + (parseInt(inputSeconds) || 0);
    setTime(total);
  };

  useEffect(() => {
    let interval;
    if (running && time > 0) {
      interval = setInterval(() => {
        setTime(t => {
          if (t <= 1) {
            setRunning(false);
            alert("Time's up!");
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running, time]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>⏲️ Timer</h1>
        <p>Set a countdown timer</p>
      </div>

      {time === 0 ? (
        <>
          <div className="form-grid">
            <div className="form-group">
              <label>Minutes</label>
              <input
                type="number"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Seconds</label>
              <input
                type="number"
                value={inputSeconds}
                onChange={(e) => setInputSeconds(e.target.value)}
                placeholder="0"
                min="0"
                max="59"
              />
            </div>
          </div>

          <button className="tool-button" onClick={setTimer} style={{width: "100%"}}>
            Set Timer
          </button>
        </>
      ) : (
        <>
          <div className="time-display">{formatTime(time)}</div>

          <div className="time-controls">
            <button className="tool-button" onClick={start} disabled={running}>Start</button>
            <button className="tool-button" onClick={stop} disabled={!running}>Pause</button>
            <button className="tool-button" onClick={() => {
              setTime(0);
              setRunning(false);
              setInputMinutes("");
              setInputSeconds("");
            }}>Reset</button>
          </div>
        </>
      )}
    </div>
  );
}
