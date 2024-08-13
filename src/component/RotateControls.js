import React, { useState } from 'react';

const RotateControls = ({ onRotate }) => {
  const [isRotationActive, setIsRotationActive] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  //rotation 버튼 toggle 처리
  const handleDivClick = () => {
    setIsRotationActive(prev => !prev);
  };

  const handleSliderChange = (event) => {
    const angle = parseInt(event.target.value, 10);
    setRotationAngle(angle);
    onRotate(angle);
  };

  const handleInputChange = (event) => {
    const angle = event.target.value;
    if (angle === '' || !isNaN(angle)) {
      setRotationAngle(angle === '' ? '' : parseInt(angle, 10));
      if (angle !== '') {
        onRotate(parseInt(angle, 10));
      }
    }
  };

  return (
    <div>
      <button
        style={{
          cursor: 'pointer',
          backgroundColor: '#f0f0f0',
          //padding: '10px',
          //borderRadius: '5px',
          //marginBottom: '10px',
          //display: 'inline-block'
        }}
        onClick={handleDivClick}
      >
        Rotation Controls
      </button>

      {isRotationActive && (
        <div>
          <label htmlFor="rotation-slider">Rotation Angle:</label>
          <input
            id="rotation-slider"
            type="range"
            min="-180"
            max="180"
            step="1"
            value={rotationAngle}
            onChange={handleSliderChange}
            style={{ display: 'block', marginBottom: '10px' }}
          />
          <span>{rotationAngle}°</span>

          <div>
            <label htmlFor="rotation-input">Angle Input:</label>
            <input
              id="rotation-input"
              type="number"
              min="-180"
              max="180"
              step="1"
              value={rotationAngle === '' ? '' : rotationAngle} // 빈 문자열인 경우 처리
              onChange={handleInputChange}
              style={{ display: 'block', marginTop: '10px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RotateControls;
