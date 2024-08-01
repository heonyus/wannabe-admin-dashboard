import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home';
import InfluencerPage from './pages/InfluencerPage';
import './styles/globals.css';

const App: React.FC = () => {
  const [username] = useState<string | null>(null);

  return (
    <Router>
      <div className="app">
        <Header username={username} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/influencer/:id" element={<InfluencerPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;