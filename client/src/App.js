import React, {Fragment, useState} from 'react';
import { Route, Routes } from "react-router-dom";
import './main.css';

import Register from './components/Login/Register';
import Login from './components/Login/Login';
import Main from './components/Main/Main';

function App() {
  const [registerMode, setRegisterMode] = useState(false);
  const [loginMode, setLoginMode] = useState(false);
  const [enableDropdown, setEnableDropdown] = useState(false);

  // call from sidebar
  const registerHandler = (status) => {
    console.log('hi', status)
    setRegisterMode(status)
    setLoginMode(false);
  }

  // call from register
  const onUserRegister = (status) => {
    console.log('hi')
    setRegisterMode(status)
  }

  const dropdownHandler = (status) => {
    console.log('dropdown', status)
    setEnableDropdown(!status)
  }

  // call from footer
  const onFooterRegisterHandler = (status) => {
    console.log('footer register called')
    setRegisterMode(!status)
  }

  const onFooterLogInHandler = (status) => {
    console.log('sign in called by footer', status)
    setLoginMode(status)
    setRegisterMode(status);
  }

  
  return ( 
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
