import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

import NoteCard from '../../components/NoteCard/NoteCard';
import TaskList from '../../components/TaskList';

export const BrowseContext = React.createContext();

export default function Content(props) {
  const [isBrowsing, setIsBrowsing] = useState(false);

  return (
    <Container fluid
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        WebkitFlexWrap: 'wrap',
        flexDirection: 'row',
        WebkitFlexDirection: 'row',
        justifyContent: isBrowsing ? 'center' : 'space-between',
        margin: '0'
      }}
    >
      <BrowseContext.Provider value={[isBrowsing, setIsBrowsing]}>
        {isBrowsing 
          ?
            <>
              <NoteCard />
              <NoteCard />
              <NoteCard />
              <NoteCard />
              <NoteCard />
              <NoteCard />
              <NoteCard />
              <NoteCard />
            </>
          :
            <>
              <NoteCard />
              <TaskList />
            </>
        }
      </BrowseContext.Provider>
    </Container>
  );
};
