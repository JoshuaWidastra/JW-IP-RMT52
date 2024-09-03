// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { auth } from './firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import './App.css'

const Home = ({ user }) => {
  const [apiMessage, setApiMessage] = useState('');

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/test')
  //     .then(response => response.json())
  //     .then(data => setApiMessage(data.message))
  //     .catch(error => console.error('Error:', error));
  // }, []);

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

const MoodInput = () => <h2>Mood Input</h2>
const Playlist = () => <h2>Playlist</h2>
const SongStory = () => <h2>Song Story</h2>

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

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
      .catch(error => console.error('Error signing out', error));
  };

  return (
    <Router>
      <div className="App">
        <h1>Welcome to MoodMix</h1>
        {user ? (
          <button onClick={signOut}>Sign Out</button>
        ) : (
          <button onClick={signIn}>Sign In with Google</button>
        )}
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/mood" element={<MoodInput />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/song-story" element={<SongStory />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App