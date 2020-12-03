import React from 'react';

import './Buttons.css'

export default function Buttons(props) {
  return (
    <>
      <i className="note-button delete-note"/>
      <i className="note-button edit-note"/>
      <i className="note-button browse-notes"/>
      <i className="note-button next-note"/>
      <i className="note-button add-note"/>
    </>
  );
};
