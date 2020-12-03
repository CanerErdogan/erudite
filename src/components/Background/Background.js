import React, { useState, useEffect } from 'react';
import { OverlayTrigger } from 'react-bootstrap';

import { API_URL, DEFAULT_BG_URL } from '../../constants';
import './Background.css';

const defaultImageInfo = {
  alt: 'Image info unavailable',
  artist: 'Caner Beyler',//'',
  url: 'https://www.google.com'//''
};

export default function Background(props) {
  const [background, setBackground] = useState("unset");
  const [imageInfo, setImageInfo] = useState(defaultImageInfo);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const changeBackground = () => {
    fetch(`${API_URL}/background`)
      .then(res => res.json()).then(data => {
        console.log('data', data);
        setBackground(`url(${data.urls.regular})`);
        setImageInfo({
          alt: data.alt_description || defaultImageInfo.alt,
          artist: data.user.name,
          url: data.urls.raw
        })
      })
      .catch(err => { 
        console.log("App fail: " + err);
        setBackground(`url(${DEFAULT_BG_URL})`);
        setImageInfo(defaultImageInfo);
      });
  };

  useEffect(() => { changeBackground() }, []);
  useEffect(() => { 
    document.getElementById('variables').style
      .setProperty('--background', background);
  }, [background]);

  return (
    <div id="variables">
      <div className="Background-wrapper">
        {props.children}
      </div>
      <OverlayTrigger
        show={isInfoVisible}
        overlay={
          <ul
            onMouseEnter={() => setIsInfoVisible(true)}
            onMouseLeave={() => setIsInfoVisible(false)}
            className="photo-info"
          >
            <li style={{ fontStyle: 'italic' }}>{imageInfo.alt}</li>
            <li>{imageInfo.artist}</li>
            <li><a href={imageInfo.url} target="blank">Link</a></li>
            <li
              style={{
                paddingRight: '2rem',
                fontSize: 'x-small',
                fontStyle: 'italic'
              }}
            >Click on the icon to change background.</li>
          </ul>
        }
      >
        <i
          className={isInfoVisible ? "photo-icon info-active" : "photo-icon"}
          onMouseEnter={() => setIsInfoVisible(true)}
          onClick={changeBackground}
        />
      </OverlayTrigger>
    </div>
  );
}
