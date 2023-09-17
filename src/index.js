import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NavbarExample from './Navbar';
import reportWebVitals from './reportWebVitals';
import { ImageTrack } from './images';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <Router> 
      <NavbarExample/>
        <Routes> 
            <Route path='/' element={<ImageTrack/>}>
            </Route>
        </Routes>
    </Router>

  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
