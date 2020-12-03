import { Container, Row } from 'react-bootstrap';

import './App.css';

import Background from './components/Background/Background';
import Search from './components/Search';
import Content from './containers/Content/Content'
import Pomodoro from './components/Pomodoro/Pomodoro';

function App() {
  return (
    <Background>
      <Search />
      <Container fluid
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Row
          style={{
            zIndex: 1,
            height: '74.5vh',
            display: 'flex',
            // flexDirection: 'column',
            justifyContent: 'space-between',
            overflowX: 'hidden',
            overflowY: 'auto',
        }}
        >
          <Content />
        </Row>
        <Row style={{bottom: 0}}>
          <Pomodoro />
        </Row>
      </Container>
    </Background>
  );
}

export default App;
