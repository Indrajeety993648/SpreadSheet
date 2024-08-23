import React from 'react';
import { useSpreadsheet } from '../hooks/useSpreadsheet';

const Toolbar = () => {
  const { formatCell, setColumnRule } = useSpreadsheet();

  const handleFormatChange = (property, value) => {
    formatCell(property, value);
  };

  const handleColumnRuleChange = (e) => {
    const column = e.target.value;
    setColumnRule(column, 'numeric');
  };

  return (
    <div className="bg-gray-100 p-2 flex space-x-2 items-center">
      <select 
        onChange={(e) => handleFormatChange('fontWeight', e.target.value)} 
        className="bg-white border border-gray-300 rounded px-2 py-1 text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out"
      >
        <option value="normal">Normal</option>
        <option value="bold">Bold</option>
      </select>
      <select 
        onChange={(e) => handleFormatChange('textAlign', e.target.value)}
        className="bg-white border border-gray-300 rounded px-2 py-1 text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out"
      >
        <option value="left">Align Left</option>
        <option value="center">Align Center</option>
        <option value="right">Align Right</option>
      </select>
      <select
        onChange={handleColumnRuleChange}
        className="bg-white border border-gray-300 rounded px-2 py-1 text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out"
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
