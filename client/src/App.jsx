// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// import { auth } from './firebase';
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import MoodInput from './components/MoodInput';
// import './App.css';


// const Home = ({ user }) => {
//   const [apiMessage, setApiMessage] = useState('');

//   // useEffect(() => {
//   //   fetch('http://localhost:3000/api/test')
//   //     .then(response => response.json())
//   //     .then(data => setApiMessage(data.message))
//   //     .catch(error => console.error('Error:', error));
//   // }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (user) {
//         const token = await user.getIdToken();
//         try {
//           const response = await fetch('http://localhost:3000/api/test', {
//             headers: {
//               'Authorization': `Bearer ${token}`
//             }
//           });
//           if (response.ok) {
//             const data = await response.json();
//             setApiMessage(data.message);
//           } else {
//             console.error('API request failed');
//           }
//         } catch (error) {
//           console.error('Error:', error);
//         }
//       }
//     };

//     fetchData();
//   }, [user]);

//   return (
//     <div>
//       <h2>Home</h2>
//       <p>API Message: {apiMessage}</p>
//       {user ? <p>Welcome, {user.displayName}!</p> : <p>Please sign in</p>}
//     </div>
//   );
// };

// // const MoodInput = () => <h2>Mood Input</h2>
// const Playlist = () => <h2>Playlist</h2>
// const SongStory = () => <h2>Song Story</h2>

// function App() {
//   const [user, setUser] = useState(null);
//   const [playlist, setPlaylist] = useState(null);
//   const [error, setError] = useState(null);
//   const [spotifyToken, setSpotifyToken] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       setUser(user);
//     });
//     return unsubscribe;
//   }, []);

//   const signIn = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider)
//       .then((result) => {
        
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
        
//         const user = result.user;
//         console.log('User signed in:', user);
//       })
//       .catch((error) => {
        
//         console.error('Error signing in with Google', error);
//       });
//   };

//   const initiateSpotifyLogin = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/api/spotify/auth-url');
//       const data = await response.json();
//       window.location.href = data.authUrl;
//     } catch (error) {
//       console.error('Error initiating Spotify login:', error);
//       setError('Failed to initiate Spotify login');
//     }
//   };

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get('code');
//     if (code) {
//       // exchange code for token
//       fetch(`http://localhost:3000/api/spotify/callback?code=${code}`)
//         .then(response => response.json())
//         .then(data => {
//           setSpotifyToken(data.access_token);
//           navigate('/'); // redirect to home after successful login
//         })
//         .catch(error => {
//           console.error('Error exchanging code for token:', error);
//           setError('Failed to complete Spotify authentication');
//         });
//     }
//   }, [navigate]);
  
//   const signOut = () => {
//     auth.signOut()
//       .catch(error => console.error('Error signing out', error));
//   };

//   const handleMoodSubmit = async (moodData) => {
//     try {
//       const token = await user.getIdToken();
//       const response = await fetch('http://localhost:3000/api/generate-playlist', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(moodData)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to generate playlist');
//       }

//       const data = await response.json();
//       setPlaylist(data);
//       setError(null);
//     } catch (err) {
//       console.error('Error generating playlist:', err);
//       setError('Failed to generate playlist. Please try again.');
//     }
//   };

//   return (
//     <Router>
//       <div className="App">
//         <h1>Welcome to MoodMix</h1>
//         {user ? (
//           <>
//             <p>Welcome, {user.displayName}!</p>
//             <button onClick={signOut}>Sign Out</button>
//             {!spotifyToken && <button onClick={initiateSpotifyLogin}>Connect Spotify</button>}
//             <MoodInput onMoodSubmit={handleMoodSubmit} />
//             {error && <p style={{color: 'red'}}>{error}</p>}
//             {playlist && (
//               <div>
//                 <h2>Your Playlist: {playlist.name}</h2>
//                 <p>{playlist.description}</p>
//                 <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
//                   Open in Spotify
//                 </a>
//               </div>
//             )}
//           </>
//         ) : (
//           <p>Please sign in</p>
//         )}
//         <Routes>
//           <Route path="/" element={<Home user={user} />} />
//           <Route path="/mood" element={<MoodInput />} />
//           <Route path="/playlist" element={<Playlist />} />
//           <Route path="/song-story" element={<SongStory />} />
//         </Routes>
//       </div>
//     </Router>
//   )
// }

// export default App

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import MoodInput from './components/MoodInput';
import './App.css';

const Home = ({ user }) => {
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const token = await user.getIdToken();
        try {
          const response = await fetch('http://localhost:3000/api/test', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setApiMessage(data.message);
          } else {
            console.error('API request failed');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchData();
  }, [user]);

  return (
    <div>
      <h2>Home</h2>
      <p>API Message: {apiMessage}</p>
      {user ? <p>Welcome, {user.displayName}!</p> : <p>Please sign in</p>}
    </div>
  );
};

const Playlist = () => <h2>Playlist</h2>
const SongStory = () => <h2>Song Story</h2>

const AppContent = () => {
  const [user, setUser] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState(null);
  const [spotifyToken, setSpotifyToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      // exchange code for token
      fetch(`http://localhost:3000/api/spotify/callback?code=${code}`)
        .then(response => response.json())
        .then(data => {
          setSpotifyToken(data.access_token);
          navigate('/'); // redirect to home after successful login
        })
        .catch(error => {
          console.error('Error exchanging code for token:', error);
          setError('Failed to complete Spotify authentication');
        });
    }
  }, [navigate]);

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log('User signed in:', user);
      })
      .catch((error) => {
        console.error('Error signing in with Google', error);
      });
  };

  const signOut = () => {
    auth.signOut()
      .then(() => {
        setUser(null);
        setSpotifyToken(null);
      })
      .catch(error => console.error('Error signing out', error));
  };

  const initiateSpotifyLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/spotify/auth-url');
      const data = await response.json();
      window.location.href = data.authUrl;
    } catch (error) {
      console.error('Error initiating Spotify login:', error);
      setError('Failed to initiate Spotify login');
    }
  };

  const handleMoodSubmit = async (moodData) => {
    try {
      const token = await user.getIdToken();
      const response = await fetch('http://localhost:3000/api/generate-playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(moodData)
      });

      if (!response.ok) {
        throw new Error('Failed to generate playlist');
      }

      const data = await response.json();
      setPlaylist(data);
      setError(null);
    } catch (err) {
      console.error('Error generating playlist:', err);
      setError('Failed to generate playlist. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Welcome to MoodMix</h1>
      {user ? (
        <>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={signOut}>Sign Out</button>
          {!spotifyToken && <button onClick={initiateSpotifyLogin}>Connect Spotify</button>}
          <MoodInput onMoodSubmit={handleMoodSubmit} />
          {error && <p style={{color: 'red'}}>{error}</p>}
          {playlist && (
            <div>
              <h2>Your Playlist: {playlist.name}</h2>
              <p>{playlist.description}</p>
              <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                Open in Spotify
              </a>
            </div>
          )}
        </>
      ) : (
        <>
          <p>Please sign in</p>
          <button onClick={signIn}>Sign In with Google</button>
        </>
      )}
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/mood" element={<MoodInput />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/song-story" element={<SongStory />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;