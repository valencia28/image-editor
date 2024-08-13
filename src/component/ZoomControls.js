import React from 'react';

const ZoomControls = ({ onZoomIn, onZoomOut, zoomLevel, onZoomChange }) => {
  const handleSliderChange = (event) => {
    const newZoomLevel = parseFloat(event.target.value);
    onZoomChange(newZoomLevel);
  };

  const handleZoomIn = () => {
    const newZoomLevel = Math.min(zoomLevel + 0.1, 5.0);
    onZoomChange(newZoomLevel);
  };

  const handleZoomOut = () => {
    const newZoomLevel = Math.max(zoomLevel - 0.1, 1.0);
    onZoomChange(newZoomLevel);
  };

  return (
    <div className="zoom-controls">
      <button onClick={handleZoomOut} className="zoom-button">-</button>
      <input
        type="range"
        min="1.0"
        max="5.0"
        step="0.1"
        value={zoomLevel}
        onChange={handleSliderChange}
        className="zoom-slider"
      />
      <button onClick={handleZoomIn} className="zoom-button">+</button>
    </div>
  );
};

export default ZoomControls;


