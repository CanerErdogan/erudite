import React, { useEffect, useReducer } from 'react';
import { Button, ButtonGroup, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function Pomodoro(props) {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'POMODORO': return {
        ...state,
        mode: 'Pomodoro', seconds: 25*60, pause: true
      };
      case 'SHORT': return {
        ...state,
        mode: 'Short', seconds: 5*0.2, pause: true,
      };
      case 'LONG': return {
        ...state,
        mode: 'Long', seconds: 15*60, pause: true
      };
      case 'COUNT': return {
        ...state,
        seconds: state.seconds - !state.pause
      };
      case 'TOGGLE': return{
        ...state,
        pause: !state.pause
      }
      default: return state;
    }
  }, {
    mode: 'Pomodoro',
    seconds: 25*60,
    pause: true
  });

  const { seconds, pause, mode } = state;
  const time = new Date(seconds * 1000).toISOString().substr(14, 5);
  const audio = new Audio('./alert.mp3');

  useEffect(() => {
    const timer = seconds > 0 &&
      setTimeout(() => dispatch({ type: 'COUNT' }), 1000);
    if (seconds <= 0) {
      audio.play();
    }
    return () => clearTimeout(timer);
  }, [seconds, pause])

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
              onClick={() => dispatch({ type: 'TOGGLE' })}
            >{time}</Card.Title>
          <ButtonGroup size="sm">
            <Button onClick={() => dispatch({ type: 'POMODORO' })}>Pomodoro</Button>
            <Button onClick={() => dispatch({ type: 'SHORT' })}>Short</Button>
            <Button onClick={() => dispatch({ type: 'LONG' })}>Long</Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </OverlayTrigger>
  );
}
