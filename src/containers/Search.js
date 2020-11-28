import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton, FormControl, InputGroup } from 'react-bootstrap';

import { API_URL } from '../constants'

export default function Search(props) {
  const [searchList, setSearchList] = useState([]);
  const [searchSite, setSearchSite] = useState({});
  const [searchField, setSearchField] = useState('');
  
  function handleSearch(event) {
    if (event.keyCode === 13) {
      fetch(`${API_URL}/search`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site: searchSite.key,
          query: searchField
        })
      })
        .then(res => res.json()).then(searchUrl => window.open(searchUrl))
        .catch(err => { console.log("App fail: " + err) });
    }
  }

  useEffect(() => {
    fetch(`${API_URL}/search`)
      .then(res => res.json()).then(sites => {
        setSearchList(sites);
        setSearchSite(sites[0])
      })
      .catch(err => {
        console.log(`Get search list failed: ${err}`);
        setSearchList([]);
      });
  }, []);

  return (
    <InputGroup>
      <DropdownButton title={searchSite ? searchSite.label : 'Loading'}>
        {searchList.map(site => {
          return (
          <Dropdown.Item
            key={site.key}
            onSelect={() => {
              setSearchSite(site)
            }}
          >{site.label}</Dropdown.Item>);
        })}
      </DropdownButton>
      <FormControl
        type="text" onKeyUp={handleSearch}
        onChange={event => {setSearchField(event.target.value)}}
        placeholder="Type to search"
      />
    </InputGroup>    
  );
}
