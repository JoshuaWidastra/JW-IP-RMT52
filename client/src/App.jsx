import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MusicPlayer from './components/MusicPlayer';
import MoodJournal from './components/MoodJournal';
import SpotifyCallback from './components/SpotifyCallback';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/player" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MusicPlayer />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/journal" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MoodJournal />
            </PrivateRoute>
          } 
        />
        <Route path="/spotify-callback" element={<SpotifyCallback />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;