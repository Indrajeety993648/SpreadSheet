import React from 'react';
import { useSpreadsheet } from '../hooks/useSpreadsheet';

const Toolbar = () => {
  const { undo, redo } = useSpreadsheet();

  return (
    <div className="bg-gray-100 p-2 flex space-x-2">
      <button onClick={undo} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Undo
      </button>
      <button onClick={redo} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Redo
      </button>
    </div>
  );
};

export default Toolbar;