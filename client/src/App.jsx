import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './firebase';
import { LOGIN_SUCCESS, LOGOUT } from './store/actionTypes';
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
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
        });
      } else {
        dispatch({ type: LOGOUT });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

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