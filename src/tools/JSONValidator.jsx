import React, { useState } from 'react';

const JSONValidator = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [validationResult, setValidationResult] = useState(null);

  const validateJson = () => {
    try {
      JSON.parse(jsonInput);
      setValidationResult({ isValid: true, message: 'Valid JSON' });
    } catch (e) {
      setValidationResult({ isValid: false, message: `Invalid JSON: ${e.message}` });
    }
  };

  return (
    <div className="tool-content">
      <h1>JSON Validator</h1>
      <p>Validate your JSON code instantly.</p>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON here..."
        rows="10"
        style={{ width: '100%', padding: '10px', marginTop: '20px', backgroundColor: '#1e1e1e', border: '1px solid #333', color: 'gold' }}
      ></textarea>
      <button 
        onClick={validateJson}
        style={{
          padding: '10px 20px',
          background: 'gold',
          color: 'black',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px',
          fontWeight: 'bold'
        }}
      >
        Validate JSON
      </button>
      {validationResult && (
        <div style={{ marginTop: '20px', padding: '10px', borderRadius: '5px', backgroundColor: validationResult.isValid ? '#28a745' : '#dc3545', color: 'white' }}>
          {validationResult.message}
        </div>
      )}
    </div>
  );
};

export default JSONValidator;