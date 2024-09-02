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
import './App.css'

const Home = () => {
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/test')
      .then(response => response.json())
      .then(data => setApiMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h2>Home</h2>
      <p>API Message: {apiMessage}</p>
    </div>
  );
};

const MoodInput = () => <h2>Mood Input</h2>
const Playlist = () => <h2>Playlist</h2>
const SongStory = () => <h2>Song Story</h2>

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Welcome to MoodMix</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mood" element={<MoodInput />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/song-story" element={<SongStory />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App