import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Transition } from 'react-transition-group';

import Buttons from './Buttons/Buttons'
import { API_URL } from '../../constants';
import './NoteCard.css'

const defaultNote = {
  title: "Title For Your First Note",
  content: "No notes available now. Let's add one!",
  id: null
};

const errorNote = {
  title: "Cannot Display Notes",
  content: "Error connecting to the server, please check later.",
  id: null
};

export default function NoteCard(props) {
  const [note, setNote] = useState(defaultNote);

  const fetchNote = (id) => {
    const routeExtension = id ? `/${id}` : '';
    fetch(`${API_URL}/note${routeExtension}`)
      .then(res => {
        if (res.status === 200) { return res.json() }
        else if (res.status === 204) { return defaultNote }
        else { return errorNote }
      })
      .then(setNote)
      .catch(err => { setNote(errorNote) });
  };

  useEffect(() => { fetchNote() }, []);
  useEffect(() => {
    if (document.getElementById(`note-content-${note.id}`).scrollTopMax > 0) {
      document.getElementById(`note-content-${note.id}`).style.height = 
        (document.getElementById(`note-content-${note.id}`).scrollHeight + 10) + 'px';
    }
  }, [note])

  return (
    <Container style={{ width: '30rem', margin: '0', paddingLeft: '0' }}>
      <Card style={{ width: '100%'}}>
        <Card.Body>
          <Card.Title
            className="note-title"
            as="input"
            value={note.title}
          />
          <Card.Text
            id={`note-content-${note.id}`}
            className="note-content"
            as="textarea"
            rows="2"
            value={note.content}
          />
        </Card.Body>
      </Card>
      <Transition>
        <Buttons />
      </Transition>
    </Container>
  );
}
