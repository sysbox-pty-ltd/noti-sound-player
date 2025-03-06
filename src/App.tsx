import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import PlayerPage from './pages/PlayerPage';
import DiscontinuePage from './pages/DiscontinuePage';

function App() {
  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={<HomePage />} />*/}
        {/*<Route path="p">*/}
        {/*  <Route path=":id" element={<PlayerPage />} />*/}
        {/*</Route>*/}
        <Route path="*" element={<DiscontinuePage />} />
      </Routes>
    </Router>
  );
}

export default App;
