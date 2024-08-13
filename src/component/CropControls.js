import React from 'react';

const CropControls = ({ isCropMode, onApplyCrop, onCancelCrop, onStartCrop }) => {
  return (
    <div className="crop-controls">
      {!isCropMode ? (
        <button onClick={onStartCrop}>Start Crop</button>
      ) : (
        <>
          <button onClick={onApplyCrop}>Apply</button>
          <button onClick={onCancelCrop}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default CropControls;
