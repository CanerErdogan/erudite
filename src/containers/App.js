import { useState } from 'react';

import logo from '../logo.svg';
import './App.css';

import NoteCard from '../components/NoteCard/NoteCard';
import SearchBar from '../components/SearchBar/SearchBar';

function App() {
  const [bgImage, setBgImage] = useState("https://e360.yale.edu/assets/site/Trees_JeroenVanNieuwenhoveFlickr.jpg");

  return (
    <div className="App">
      <div style={{
        backgroundImage: `url("${bgImage}")`,
        backgroundSize: 'cover',
        position: 'absolute',
        width: '100vw',
        height: '100vh'
    }}>
        <NoteCard />
        <SearchBar />
      </div>
    </div>
  );
}

export default App;
