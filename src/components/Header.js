import React from 'react';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Spreadsheet</h1>
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;