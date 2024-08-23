import React, { useState } from 'react';
import { useSpreadsheet } from '../hooks/useSpreadsheet';

const Toolbar = () => {
  const { formatCell, setColumnRule } = useSpreadsheet();
  const [selectedColumn, setSelectedColumn] = useState('');

  const handleFormatChange = (property, value) => {
    formatCell(property, value);
  };

  const handleColumnRuleChange = (e) => {
    const column = e.target.value;
    if (column) {
      setColumnRule(column, 'numeric');
      alert(`Column ${column} is now accepting only numeric values.`);
      setSelectedColumn(column);
    }
  };

  return (
    <div className="p-2 flex space-x-2 items-center">
      <select 
        onChange={(e) => handleFormatChange('fontWeight', e.target.value)} 
        className="bg-blue-600 text-white border border-blue-300 rounded px-2 py-1 text-sm hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
      >
        <option value="normal">Normal</option>
        <option value="bold">Bold</option>
      </select>
      <select 
        onChange={(e) => handleFormatChange('textAlign', e.target.value)}
        className="bg-blue-600 text-white border border-blue-600 rounded px-2 py-1 text-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
      >
        <option value="left">Align Left</option>
        <option value="center">Align Center</option>
        <option value="right">Align Right</option>
      </select>
      <select
        value={selectedColumn}
        onChange={handleColumnRuleChange}
        className="bg-blue-600 text-white border border-blue-600 rounded px-2 py-1 text-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
      >
        <option value="">Set Numeric Column</option>
        {Array.from({ length: 26 }, (_, i) => (
          <option key={i} value={String.fromCharCode(65 + i)}>
            Column {String.fromCharCode(65 + i)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Toolbar;
