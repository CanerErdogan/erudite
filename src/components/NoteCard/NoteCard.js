import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

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
        document.getElementById(`note-content-${note.id}`).scrollHeight + 10 + 'px';
    }
  }, [note])

  return (
    <Card style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text
          id={`note-content-${note.id}`}
          className="note-content"
          as="textarea"
          rows="2"
          value={note.content}
        ></Card.Text>
      </Card.Body>
    </Card>
  );
}
