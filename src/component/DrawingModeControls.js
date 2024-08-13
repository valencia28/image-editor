import React, { useState, useEffect } from 'react';

const DrawingModeControls = ({ onStartDrawingMode }) => {
    const [selectedMode, setSelectedMode] = useState('FREE_DRAWING');
    const [drawingOptions, setDrawingOptions] = useState({
        color: '#000000',
        width: 5,
    });
    const [drawingModeActive, setDrawingModeActive] = useState(false);

    useEffect(() => {
        if (drawingModeActive) {
            onStartDrawingMode(selectedMode, drawingOptions);
        }
    }, [selectedMode, drawingOptions, onStartDrawingMode, drawingModeActive]);

    const handleModeChange = (mode) => {
        setSelectedMode(mode);
    };

    const handleWidthChange = (e) => {
        setDrawingOptions(prev => ({
            ...prev,
            width: e.target.value
        }));
    };

    const handleDrawingModeButtonClick = () => {
        setDrawingModeActive(true);
        setSelectedMode('FREE_DRAWING');  
    };

    return (
        <div className="drawing-mode-controls">
            <button onClick={handleDrawingModeButtonClick}>Drawing Mode</button>
            <div>
                <button
                    className={selectedMode === 'FREE_DRAWING' ? 'active' : ''}
                    onClick={() => handleModeChange('FREE_DRAWING')}
                >
                    Free Drawing
                </button>
                <button
                    className={selectedMode === 'LINE_DRAWING' ? 'active' : ''}
                    onClick={() => handleModeChange('LINE_DRAWING')}
                >
                    Line Drawing
                </button>
            </div>
            <div>
                <label>Brush Color:
                    <input
                        type="color"
                        value={drawingOptions.color}
                        onChange={(e) => setDrawingOptions(prev => ({
                            ...prev,
                            color: e.target.value
                        }))}
                    />
                </label>
                <label>Brush Width:
                    <input
                        type="range"
                        min="1"
                        max="30"
                        value={drawingOptions.width}
                        onChange={handleWidthChange}
                    />
                    <span>{drawingOptions.width}</span>
                </label>
            </div>
        </div>
    );
};

export default DrawingModeControls;

