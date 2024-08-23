import React, { useState } from 'react';

const Cell = ({ value, format, validation, onChange }) => {
  const [editing, setEditing] = useState(false);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (validation === 'numeric' && !/^\d*$/.test(newValue)) {
      return;
    }
    onChange({ value: newValue });
  };

  const cellStyle = {
    textAlign: format.alignment,
    fontSize: `${format.fontSize}px`,
  };

  return (
    <div
      className="border border-gray-300 p-1 min-h-[30px] bg-white hover:bg-gray-100"
      style={cellStyle}
      onDoubleClick={handleDoubleClick}
    >
      {editing ? (
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          className="w-full h-full outline-none bg-transparent"
          style={cellStyle}
        />
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
};

export default Cell;