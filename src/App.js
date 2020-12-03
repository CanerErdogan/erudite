import './App.css';

import Background from './components/Background/Background';
import Search from './components/Search';
import Content from './containers/Content/Content'
import Pomodoro from './components/Pomodoro/Pomodoro';

function App() {
  return (
    <Background>
      <Search />
      <Content />
      <Pomodoro />
    </Background>
  );
}

export default App;
