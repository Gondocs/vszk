import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NavbarExample from './Navbar';
import reportWebVitals from './reportWebVitals';
//import { Cards } from './Mainpage';
import { ImageTrack } from './images';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <NavbarExample/>
      <ImageTrack/>
      {/*<Cards/>*/}
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
