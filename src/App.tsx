import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlayerPage from './pages/PlayerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="p">
          <Route path=":id" element={<PlayerPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
