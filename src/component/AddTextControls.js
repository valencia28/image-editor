import React, { useState, useEffect } from 'react';

const AddTextControls = ({ selectedProps, onAddText, onChangeTextStyle }) => {
  const { fontSize, fill, fontStyle, fontWeight, textAlign, textDecoration } = selectedProps;

  const onChange = (e) => {
    onChangeTextStyle({
      [e.target.name]: e.target.value
    })
  }

  if (selectedProps?.type !== "i-text") return (<div><button onClick={onAddText}>Add Text</button></div>)
  return (
    <div>
      <button onClick={onAddText}>Add Text</button>
      <div>
        <label>
          Font Size:
          <input
            type="number"
            name="fontSize"
            value={fontSize}
            onChange={onChange}
            min="1"
            style={{ width: '80px', marginRight: '10px' }}
          />
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            name="fontSize"
            value={fontSize}
            onChange={onChange}
            style={{ width: '200px' }}
          />
        </label>
        <label>
          Font Weight:
          <input
            type="number"
            name="fontWeight"
            value={fontWeight}
            onChange={onChange}
            min="100"
            max="900"
            step="100"
            style={{ width: '80px', marginRight: '10px' }}
          />
          <input
            type="range"
            min="100"
            max="900"
            step="100"
            value={fontWeight}
            name="fontWeight"
            onChange={onChange}
            style={{ width: '200px' }}
          />
        </label>
        <label>
          Font Style:
          <select value={fontStyle} 
            name="fontStyle" onChange={onChange}>
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
          </select>
        </label>
        <label>
          Text Decoration:
          <select value={textDecoration} name="textDecoration" onChange={onChange}>
            <option value="none">None</option>
            <option value="underline">Underline</option>
          </select>
        </label>
        <label>
          Font Color:
          <input
            type="color"
            name="fill"
            value={fill}
            onChange={onChange}
          />
          <input
            type="text"
            name="fill"
            value={fill}
            onChange={onChange}
            placeholder="#123456"
            style={{ marginLeft: '10px' }}
          />
        </label>
        <div>
          <label><input type="radio" name="textAlign" value="left" onChange={onChange}></input>Left</label>
          <label><input type="radio" name="textAlign" value="center" onChange={onChange}></input>Center</label>
          <label><input type="radio" name="textAlign" value="right" onChange={onChange}></input>Right</label>
        </div>
      </div>
    </div>
  );
};

export default AddTextControls;


