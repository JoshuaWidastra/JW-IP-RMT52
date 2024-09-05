import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Playlist from './pages/Playlist';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => !!state.spotify.accessToken);
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/callback" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/playlist" 
            element={
              <ProtectedRoute>
                <Playlist />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;