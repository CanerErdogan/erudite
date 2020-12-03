import React, { useContext } from 'react';

import './Buttons.css'

import { BrowseContext } from '../../../containers/Content/Content';

export default function Buttons(props) {
  const [isBrowsing, setIsBrowsing] = useContext(BrowseContext);

  return (
    <>
      <i className="note-button delete-note"/>
      <i className="note-button edit-note"/>
      <i className="note-button browse-notes" onClick={() => setIsBrowsing(!isBrowsing)}/>
      <i className="note-button next-note"/>
      <i className="note-button add-note"/>
    </>
  );
};
