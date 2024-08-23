// App.js
import React from 'react';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Grid from './components/Grid'; // Ensure this import is correct
import { SpreadsheetProvider } from './hooks/useSpreadsheet';

function App() {
  return (
    <SpreadsheetProvider>
      <div className="flex flex-col h-screen">
        <Header />
        <Toolbar />
        <div className="flex-grow overflow-hidden">
          <Grid /> {/* Ensure Grid is used */}
        </div>
      </div>
    </SpreadsheetProvider>
  );
}

export default App;
