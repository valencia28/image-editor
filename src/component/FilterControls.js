import React, { useState } from 'react';

const FilterControls = ({ onApplyFilter }) => {
  const [brightness, setBrightness] = useState(0);
  const [isBrightnessActive, setIsBrightnessActive] = useState(false);

  const handleBrightnessChange = (event) => {
    const newBrightness = parseFloat(event.target.value);
    setBrightness(newBrightness);
    if (isBrightnessActive) {
      onApplyFilter('Brightness', { brightness: newBrightness });
    }
  };

  const handleCheckboxChange = () => {
    const newIsBrightnessActive = !isBrightnessActive;
    setIsBrightnessActive(newIsBrightnessActive);
    if (newIsBrightnessActive) {
      onApplyFilter('Brightness', { brightness });
    } else {
      onApplyFilter('Brightness', { brightness: 0 }, true); 
    }
  };

  return (
    <div>
      <div>Filter</div>
      <div>
        <button onClick={() => onApplyFilter('Grayscale')}>Grayscale</button>
        <button onClick={() => onApplyFilter('Invert')}>Invert</button>
        <button onClick={() => onApplyFilter('Sepia')}>Sepia</button>
        <button onClick={() => onApplyFilter('Blur', { blur: 0.1 })}>Blur</button>
        <button onClick={() => onApplyFilter('Sharpen')}>Sharpen</button>
        <button onClick={() => onApplyFilter('Emboss')}>Emboss</button>
        <button onClick={() => onApplyFilter('Pixelate')}>Pixelate</button>

        <div>
          <label>
            <input
              type="checkbox"
              checked={isBrightnessActive}
              onChange={handleCheckboxChange}
            />
            Brightness
          </label>
        </div>
      </div>

      {/* 슬라이더 추가*/}
      {isBrightnessActive && (
        <div>
          <label htmlFor="brightness-slider">Brightness:</label>
          <input
            id="brightness-slider"
            type="range"
            min="-1"
            max="1"
            step="0.1"
            value={brightness}
            onChange={handleBrightnessChange}
          />
          <span>{brightness}</span>
        </div>
      )}
    </div>
  );
};

export default FilterControls;

