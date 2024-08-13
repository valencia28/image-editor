import React, { useRef } from 'react';

const ImageUploader = ({ onFileChange }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Load</button>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={onFileChange} 
        style={{ display: 'none' }} 
      />
    </div>
  );
};

export default ImageUploader;
