import React from 'react';

const FlipControls = ({ onFlip, onResetFlip }) => {
    return (
        <div>
            <div>Flip</div>
            <div>
                <button onClick={() => onFlip('X')}>Flip X</button>
                <button onClick={() => onFlip('Y')}>Flip Y</button>
                <button onClick={onResetFlip}>Reset Flip</button>
            </div>
        </div>
    );
};

export default FlipControls;

