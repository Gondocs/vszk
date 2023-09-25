import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import NavbarExample from './components/Navbar/Navbar';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import LoginPage from './components/LoginAndRegister/loginPage';
import Register from './components/LoginAndRegister/RegisterPage';
import PageNotFound from './components/PageNotFound';
import {HomePage} from './components/MainPage';
import { Footer } from './components/Footer';
import SoftwareList from './components/SoftwareList';
import SoftwareDetail from './components/SoftwareDetail';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <Router> 
      <NavbarExample/>
        <Routes> 
            <Route path='/' element={ <> <HomePage/> <Footer/> </> }> </Route>
            <Route path='/belepes' element={ <> <LoginPage/> <Footer/> </> }>  </Route>
            <Route path='/regisztracio' element={ <> <Register/> <Footer/> </> }>  </Route>
            <Route path='*' element={ <> <PageNotFound/> <Footer/> </> }> </Route>
            <Route path='/szoftverek' element={ <> <SoftwareList/> <Footer/> </> } > </Route>
            <Route path='/szoftverek/:name' element= {<> <SoftwareDetail/> <Footer/> </>}></Route>
        </Routes>
    </Router>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
