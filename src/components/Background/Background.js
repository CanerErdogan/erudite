import React, { useState, useEffect } from 'react';

import { API_URL, DEFAULT_BG_URL } from '../../constants';
import './Background.css';

export default function Background(props) {
  const [background, setBackground] = useState("unset");

  const changeBackground = () => {
    fetch(`${API_URL}/background`)
      .then(res => res.json()).then(data => {
        console.log('data', data);
        setBackground(`url(${data.urls.regular})`);
      })
      .catch(err => { 
        console.log("App fail: " + err);
        setBackground(`url(${DEFAULT_BG_URL})`);
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
    </div>
  );
}
