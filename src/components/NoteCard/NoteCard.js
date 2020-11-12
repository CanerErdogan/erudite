import React, { useEffect, useState } from 'react';
import { Animated } from 'react-animated-css';

import './NoteCard.css';

import { API_URL } from '../../constants';


const NoteCard = () => {

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

  const emptyNote = {
    title: '',
    content: '',
    id: null
  };

  const [note, setNote] = useState(defaultNote);
  const [noteInput, setNoteInput] = useState(emptyNote);

  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [noteFormVisible, setNoteFormVisible] = useState(false);
  const [editActive, setEditActive] = useState(false);

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

  const onNoteChange = (event) => {
    const { name, value } = event.target;
    if (name === 'title') { setNoteInput({ ...noteInput, title: value }) }
    else if (name === 'content') { setNoteInput({ ...noteInput, content: value }) }
  };

  const addNote = () => {
    const { title, content } = noteInput;
    if (title && content) {
      fetch(`${API_URL}/note`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({title, content})
      })
        .then(res => res.json())
        .then(id => {
          fetchNote(id);
          setNoteFormVisible(false);
        }).catch(err => {console.log("Post note error: "+ err)});
        setNoteInput(emptyNote);
    } else {console.log("Fill both fields.")}
  };

  const deleteNote = () => {
    const { id } = note;
    fetch(`${API_URL}/note/${id}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        setNoteFormVisible(false);
        fetchNote();
      })
      .catch(err => {console.log("Delete note error: "+ err)});
  };

  const editNote = () => {
    const { title, content } = noteInput;
    if (title && content) {
      fetch(`${API_URL}/note/${note.id}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({title, content})
      })
        .then(res => res.json())
        .then(id => {
          setEditActive(false);
          setNoteFormVisible(false);
          fetchNote(id);
        }).catch(err => {console.log("Post note error: "+ err)});
    } else {console.log("Fill both fields.")}
  }

  useEffect(() => { setNoteFormVisible(false) }, []);
  useEffect(() => { fetchNote() }, []);

  return (
    <div className="center center-ns measure-wide-l measure-wide-m ma0 ma5-ns mt2 mt2-ns pa0 pa4-ns" onMouseLeave={() => setButtonsVisible(noteFormVisible)}>
      <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={250} animationOutDuration={250} isVisible={buttonsVisible}>
        <Animated animationIn="slideInUp" animationOut="slideOutDown" animationInDuration={400} animationOutDuration={400} isVisible={buttonsVisible}>
          {noteFormVisible
            ? <div className="tr tr-ns button-wrapper">
              <i className="pointer contain f5 mh2-ns mh2 mv0-ns mv0 dib note-button cancel-note" onClick={() => {
                setNoteInput(emptyNote);
                setNoteFormVisible(false);
                }}></i>
              <i className="pointer contain f5 mh2-ns mh2 mv0-ns mv0 dib note-button accept-note" onClick={editActive ? editNote : addNote}></i>
            </div>
            : <div className="tr tr-ns button-wrapper">
              <i className="pointer contain f5 mh2-ns mh2 mv0-ns mv0 dib note-button delete-note" onClick={deleteNote}></i>
              <i className="pointer contain f5 mh2-ns mh2 mv0-ns mv0 dib note-button edit-note" onClick={() => {
                setNoteInput(note);
                setEditActive(true);
                setNoteFormVisible(true);
                }}></i>
              <i className="pointer contain f5 mh2-ns mh2 mv0-ns mv0 dib note-button browse-notes"></i>
              <i className="pointer contain f5 mh2-ns mh2 mv0-ns mv0 dib note-button next-note" onClick={() => fetchNote()}></i>
              <i className="pointer contain f5 mh2-ns mh2 mv0-ns mv0 dib note-button add-note" onClick={() => setNoteFormVisible(true)}></i>
            </div>
          }
        </Animated>
      </Animated>
      <article className="measure-l measure-m mb3-ns mb3 bg-white br3 pa1 pa4-ns mv3 ba b--black-10"
        onMouseEnter={() => setButtonsVisible(true)}>
        {noteFormVisible
          ? <div>
            <div className="tc">
              <textarea className="f4 b b--none tc mt2 mb0 pb1 pt1"
                rows="1" name="title" id="title" placeholder="Title" autoFocus
                value={noteInput.title} onChange={onNoteChange}>
              </textarea>
              <hr className="mw3 bb bw1 b--black-10"></hr>
            </div>
            <textarea className="lh-copy measure center b--none f5 black-70 mt1 w-100 h-70"
              rows="7" name="content" id="content" placeholder="Type note content"
              value={noteInput.content} onChange={onNoteChange}>
            </textarea>
          </div>
          : <div>
            <div className="tc">
              <h1 className="f4 mb3">{note.title}</h1>
              <hr className="mw3 bb bw1 b--black-10 mt0"></hr>
            </div>
            
            {note.content.split('\n').map((paragraph, idx) => {
              return (
                <p className="lh-copy measure tl f5 black-70 mv0 mv0-l" key={"paragraph" + idx}>{paragraph}</p>
              );
            })}
          </div>
        }
      </article>
    </div>
  );
};

export default NoteCard;
