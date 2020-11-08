import React, { useState } from 'react';
// import sendRequestToSearch from '../../api/server.js';

const SearchBar = () => {

  const getSearchSiteList = () => {
    return [
      {value: "duckduckgo", key: "duckduckgo", label: "DuckDuckGo"},
      {value: "google", key: "google", label: "Google"},
    ];
  };

  const searchSiteList = getSearchSiteList();
  const [searchSite, setSearchSite] = useState(searchSiteList[0]);
  const [searchField, setSearchField] = useState('');

  const searchWheel = (event) => {
    // if (event.deltaY < 0)
    console.log(event.deltaY);
  };

  const onSearch = (event) => {
    if (event.keyCode === 13) {
      // console.log(`search ${searchField}`);
      // sendRequestToSearch(searchSite, searchField);
      // fetch(`https://api.duckduckgo.com/?q=${searchField}&format=json`)
      //   .then(res => res.json())
      //   .then(console.log("Success"));
    }
  }

  return (
    <div className="center flex w-50">
      <select id="search-site-menu" className="ba b--black-20 pa2 mb2 db w-20" name="search-site" onWheel={searchWheel}>
        {searchSiteList.map(site => {
          const {value, label, key} = site;
          return (
            <option label={label} value={value} key={key} onClick={e => {setSearchSite(site)}}></option>
          );
        })}
      </select>
      <input id="search-field" className="input-reset ba b--black-20 pa2 mb2 db w-80" type="text"
        onChange={e => {setSearchField(e.target.value)}} onKeyUp={onSearch}></input>
    </div>
  );
};

export default SearchBar;

/* 
TODOs:
  setSearchSiteList will be implemented.
*/