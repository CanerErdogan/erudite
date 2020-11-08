import logo from '../logo.svg';
import './App.css';

import NoteCard from '../components/NoteCard/NoteCard';
import SearchBar from '../components/SearchBar/SearchBar';

function App() {
  return (
    <div className="App">
      <NoteCard />
      <SearchBar />
    </div>
  );
}

export default App;
