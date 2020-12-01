import { Row, Col, Container } from 'react-bootstrap';

import './App.css';

import Background from './components/Background/Background';
import Pomodoro from './components/Pomodoro/Pomodoro';
import NoteCard from './components/NoteCard/NoteCard';
import Search from './components/Search';
import TaskList from './components/TaskList';

function App() {
  return (
    <>
    <Background>
      <Search />
      <Container>
        <Row>
          <Col>
            <NoteCard />
          </Col>
          <Col>
            <TaskList />
          </Col>
        </Row>
      </Container>
      <Pomodoro />
    </Background>
    </>
  );
}

export default App;
