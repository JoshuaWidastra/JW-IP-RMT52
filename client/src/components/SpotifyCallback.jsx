import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSpotifyTokens } from '../store/actions/spotifyActions';

function SpotifyCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const expiresIn = params.get('expires_in');
    
    if (accessToken && refreshToken && expiresIn) {
      dispatch(setSpotifyTokens({ accessToken, refreshToken, expiresIn: parseInt(expiresIn, 10) }));
      navigate('/player');
    } else {
      navigate('/login');
    }
  }, [location, dispatch, navigate]);

  return <div>Processing Spotify login...</div>;
}

export default SpotifyCallback;