import React, { useState, useRef, useEffect } from 'react';
import { useSpreadsheet } from '../hooks/useSpreadsheet';

const ROWS = 100;
const COLS = 26;

const Grid = () => {
  const { cells, updateCell, setColumnRule, columnRules } = useSpreadsheet();
  const [selectedCell, setSelectedCell] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedCell && !e.ctrlKey && !e.metaKey) {
        const [row, col] = selectedCell;
        switch (e.key) {
          case 'ArrowUp':
            setSelectedCell([Math.max(0, row - 1), col]);
            break;
          case 'ArrowDown':
            setSelectedCell([Math.min(ROWS - 1, row + 1), col]);
            break;
          case 'ArrowLeft':
            setSelectedCell([row, Math.max(0, col - 1)]);
            break;
          case 'ArrowRight':
            setSelectedCell([row, Math.min(COLS - 1, col + 1)]);
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell]);

  const getCellId = (row, col) => `${String.fromCharCode(65 + col)}${row + 1}`;

  const handleCellChange = (cellId, value) => {
    const col = cellId.charAt(0);
    if (columnRules[col] === 'numeric' && !/^\d*\.?\d*$/.test(value)) {
      return;
    }
    updateCell(cellId, { value });
  };

  const handleCheckboxChange = (column, isChecked) => {
    if (isChecked) {
      setColumnRule(column, 'numeric');
    } else {
      setColumnRule(column, 'text'); // Allow any value if unchecked
    }
  };

  const renderCell = (row, col) => {
    const cellId = getCellId(row, col);
    const isSelected = selectedCell && selectedCell[0] === row && selectedCell[1] === col;
    const isHovered = hoveredCell && hoveredCell[0] === row && hoveredCell[1] === col;
    const cellData = cells[cellId] || { value: '', style: {}, type: 'text' };

    return (
      <td
        key={cellId}
        className={`border border-gray-300 p-1 ${isSelected ? 'bg-blue-100' : ''} ${isHovered ? 'border-gray-500' : ''}`}
        onClick={() => setSelectedCell([row, col])}
        onMouseEnter={() => setHoveredCell([row, col])}
        onMouseLeave={() => setHoveredCell(null)}
        style={{ minWidth: '100px', minHeight: '50px' }}
      >
        <textarea
          value={cellData.value}
          onChange={(e) => handleCellChange(cellId, e.target.value)}
          className="w-full h-full outline-none bg-transparent resize-none overflow-hidden"
          style={{ ...cellData.style, minHeight: '30px' }}
          rows={1}
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
        />
      </td>
    );
  };

  const renderColumnHeaders = () => (
    <tr>
      <th className="sticky top-0 left-0 z-10 bg-gray-100"></th>
      {Array.from({ length: COLS }, (_, i) => {
        const column = String.fromCharCode(65 + i);
        const isChecked = columnRules[column] === 'numeric';
        return (
          <th key={i} className="sticky top-0 z-10 bg-gray-100 text-center py-2 px-4">
            {column}
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => handleCheckboxChange(column, e.target.checked)}
              className="ml-2"
            />
          </th>
        );
      })}
    </tr>
  );

  return (
    <div className="overflow-auto h-full" ref={gridRef}>
      <table className="border-collapse">
        <thead>{renderColumnHeaders()}</thead>
        <tbody>
          {Array.from({ length: ROWS }, (_, row) => (
            <tr key={row}>
              <th className="sticky left-0 z-10 bg-gray-100 text-center py-1 px-2">{row + 1}</th>
              {Array.from({ length: COLS }, (_, col) => renderCell(row, col))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
