import React from 'react';
import { useSpreadsheet } from '../hooks/useSpreadsheet';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useSpreadsheet();

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="p-2 rounded bg-blue-500 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
  );
};

export default SearchBar;
