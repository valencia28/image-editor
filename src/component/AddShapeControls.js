import React, { useState } from 'react';

const AddShapeControls = ({ onAddShape }) => {
  const [shapeType, setShapeType] = useState('rect');
  const [shapeOptions, setShapeOptions] = useState({
    fill: '#ffffff',
    stroke: '#000000',
    strokeWidth: 1,
    width: 100,
    height: 100,
    rx: 0,
    ry: 0,
    left: 100,
    top: 100,
    isRegular: false
  });

  const handleShapeTypeChange = (e) => {
    const newShapeType = e.target.value;
    setShapeType(newShapeType);
    setShapeOptions(prev => ({
      ...prev,
      width: newShapeType === 'rect' ? prev.width : 100,
      height: newShapeType === 'rect' ? prev.height : 100,
      rx: newShapeType === 'circle' ? (prev.rx || 50) : 0,
      ry: newShapeType === 'circle' ? (prev.ry || 50) : 0,
    }));
  };

  const handleOptionChange = (name, value) => {
    setShapeOptions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddShape = () => {
    onAddShape(shapeType, shapeOptions);
  };

  return (
    <div className="add-shape-controls">
      <button onClick={handleAddShape}>Add Shape</button>
      <div>
        <button value="rect" onClick={handleShapeTypeChange}>Rectangle</button>
        <button value="circle" onClick={handleShapeTypeChange}>Circle</button>
        <button value="triangle" onClick={handleShapeTypeChange}>Triangle</button>
      </div>
      <div>
        <label>Fill Color:
          <input
            type="color"
            value={shapeOptions.fill}
            onChange={(e) => handleOptionChange('fill', e.target.value)}
          />
        </label>
        <label>Stroke Color:
          <input
            type="color"
            value={shapeOptions.stroke}
            onChange={(e) => handleOptionChange('stroke', e.target.value)}
          />
        </label>
        <label>Stroke Width:
          <input
            type="range"
            min="1"
            max="10"
            step="0.1"
            value={shapeOptions.strokeWidth}
            onChange={(e) => handleOptionChange('strokeWidth', parseFloat(e.target.value))}
            className="slider"
          />
          <span>{shapeOptions.strokeWidth}</span>
        </label>
      </div>
    </div>
  );
};

export default AddShapeControls;

