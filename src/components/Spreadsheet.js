import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSpreadsheet } from '../hooks/useSpreadsheet';

const ROWS = 100;
const COLS = 26;

const Spreadsheet = () => {
  const { cells, updateCell } = useSpreadsheet();
  const [selectedCell, setSelectedCell] = useState(null);
  const spreadsheetRef = useRef(null);

  const handleKeyDown = useCallback((e) => {
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
  }, [selectedCell]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const getCellId = (row, col) => `${String.fromCharCode(65 + col)}${row + 1}`;

  const renderCell = (row, col) => {
    const cellId = getCellId(row, col);
    const isSelected = selectedCell && selectedCell[0] === row && selectedCell[1] === col;
    const cellData = cells[cellId] || { value: '', style: {} };

    return (
      <td
        key={cellId}
        className={`border border-gray-300 p-1 ${isSelected ? 'bg-blue-100' : ''}`}
        onClick={() => setSelectedCell([row, col])}
      >
        <input
          type="text"
          value={cellData.value}
          onChange={(e) => updateCell(cellId, { value: e.target.value })}
          className="w-full h-full outline-none bg-transparent"
          style={cellData.style}
        />
      </td>
    );
  };

  const renderColumnHeaders = () => (
    <tr>
      <th className="sticky top-0 left-0 z-10 bg-gray-100"></th>
      {Array.from({ length: COLS }, (_, i) => (
        <th key={i} className="sticky top-0 z-10 bg-gray-100 text-center py-2">
          {String.fromCharCode(65 + i)}
        </th>
      ))}
    </tr>
  );

  return (
    <div className="overflow-auto h-full" ref={spreadsheetRef}>
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

export default Spreadsheet;
