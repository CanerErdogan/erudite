import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function Pomodoro(props) {
  // const timestamp = null;
  const [seconds, setSeconds] = useState(25*60);
  const [pause, setPause] = useState(true);
  const [mode, setMode] = useState('Pomodoro');

  const audio = new Audio('./alert.mp3');

  function handlePomodoro(event) {
    setMode('Pomodoro');
    setPause(true);
    setSeconds(25*60);
  }

  function handleShort(event) {
    setMode('Short');
    setPause(true);
    setSeconds(5*60);
  }

  function handleLong(event) {
    setMode('Long');
    setPause(true);
    setSeconds(15*60);
  }

  useEffect(() => {
    const timer = seconds > 0 &&
      setTimeout(() => setSeconds(seconds - !pause), 1000);
    if (seconds <= 0) {
      audio.play();
    }
    return () => clearTimeout(timer);
  }, [seconds, pause])

  const time = new Date(seconds * 1000).toISOString().substr(14, 5);

  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip>Click on timer to count/pause.</Tooltip>}
    >
      <Card
        style={{width: '15rem', textAlign: 'center'}}
        onClick={() => audio.pause()}
      >
        <Card.Header>{mode}{pause ? '  \u25A0' : '  \u25B8'}</Card.Header>
        <Card.Body>
            <Card.Title
              style={{fontSize: 'xx-large', cursor: 'pointer'}}
              onClick={() => setPause(!pause)}
            >{time}</Card.Title>
          <ButtonGroup size="sm">
            <Button onClick={handlePomodoro}>Pomodoro</Button>
            <Button onClick={handleShort}>Short</Button>
            <Button onClick={handleLong}>Long</Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </OverlayTrigger>
  );
}
