import React from 'react';
import { Container } from 'react-bootstrap';

import NoteCard from '../../components/NoteCard/NoteCard';
import TaskList from '../../components/TaskList';

export default function Content(props) {
  return (
    <Container fluid
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0'
      }}
    >
      <NoteCard />
      <TaskList />
    </Container>
  );
};
