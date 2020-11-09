import { useEffect, useState } from 'react';

import logo from '../logo.svg';
import './App.css';

import NoteCard from '../components/NoteCard/NoteCard';
import SearchBar from '../components/SearchBar/SearchBar';
import { API_URL, DEFAULT_BG_URL } from '../constants';

function App() {
  const [background, setBackground] = useState("unset");
  const [cssProps, setCssProps] = useState({});

  const changeBackground = () => {
    fetch(`${API_URL}/background`)
      .then(res => res.json()).then(data => {
        console.log(data);
        setBackground(`url(${data.urls.regular})`);
      })
      .catch(err => { 
        console.log("App fail: " + err);
        setBackground(`url(${DEFAULT_BG_URL})`);
      });
    
  };

  useEffect(() => { changeBackground() }, []);
  useEffect(() => { setCssProps({'--background': background}); }, [background]);

  return (
    <div id="variables" style={cssProps}>
      <div className="bg-wrapper">
        <div className="App">
          <NoteCard />
          <SearchBar />
          <button className="f6 link dim br1 ba ph3 pv2 mb2 dib black pointer" onClick={changeBackground}>Change Background</button>
        </div>
      </div>
    </div>
  );
}

export default App;
