import React, { createContext, useContext, useState, useCallback } from 'react';

const SpreadsheetContext = createContext();

export const useSpreadsheet = () => useContext(SpreadsheetContext);

export const SpreadsheetProvider = ({ children }) => {
  const [cells, setCells] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [columnRules, setColumnRules] = useState({});

  const updateCell = useCallback((cellId, updates) => {
    setCells(prevCells => ({
      ...prevCells,
      [cellId]: { ...prevCells[cellId], ...updates }
    }));
  }, []);

  const formatCell = useCallback((property, value) => {
    setCells(prevCells => {
      const newCells = { ...prevCells };
      Object.keys(newCells).forEach(cellId => {
        if (newCells[cellId].selected) {
          newCells[cellId] = {
            ...newCells[cellId],
            style: { ...newCells[cellId].style, [property]: value }
          };
        }
      });
      return newCells;
    });
  }, []);

  const setColumnRule = useCallback((columns, rule) => {
    if (!Array.isArray(columns)) {
      columns = [columns];  // Convert to an array if it's not already
    }
  
    setColumnRules(prevRules => {
      const newRules = { ...prevRules };
      columns.forEach(column => {
        newRules[column] = rule;
      });
      return newRules;
    });
  }, []);
  

  const value = {
    cells,
    updateCell,
    formatCell,
    searchTerm,
    setSearchTerm,
    columnRules,
    setColumnRule,
  };

  return (
    <SpreadsheetContext.Provider value={value}>
      {children}
    </SpreadsheetContext.Provider>
  );
};
