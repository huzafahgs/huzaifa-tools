import { useState, useEffect } from "react";
import "../styles/Tool.css";

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [voice, setVoice] = useState(0);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [voices, setVoices] = useState([]);

  const synth = window.speechSynthesis;

  useEffect(() => {
    const updateVoices = () => {
      setVoices(synth.getVoices());
    };
    updateVoices();
    synth.onvoiceschanged = updateVoices;
  }, [synth]);

  const speak = () => {
    if (!text) {
      alert("Please enter text!");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[voice] || voices[0];
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);

    synth.speak(utterance);
  };

  const stop = () => {
    synth.cancel();
    setSpeaking(false);
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🔊 Text to Speech</h1>
        <p>Convert text to speech</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to speak..."
        className="tool-textarea"
      />

      <div className="form-grid">
        <div className="form-group">
          <label>Voice</label>
          <select value={voice} onChange={(e) => setVoice(parseInt(e.target.value))}>
            {voices.map((v, i) => (
              <option key={i} value={i}>{v.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Speed: {rate.toFixed(1)}x</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="slider-input"
          />
        </div>
        <div className="form-group">
          <label>Pitch: {pitch.toFixed(1)}</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(parseFloat(e.target.value))}
            className="slider-input"
          />
        </div>
      </div>

      <div style={{display: "flex", gap: "10px"}}>
        <button className="tool-button" onClick={speak} disabled={speaking}>
          {speaking ? "Speaking..." : "Speak"}
        </button>
        <button className="tool-button" onClick={stop} disabled={!speaking}>
          Stop
        </button>
      </div>
    </div>
  );
}
