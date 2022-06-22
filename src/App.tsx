import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import PlayerPage from './Pages/PlayerPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="p">
          <Route path=":id" element={<PlayerPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
