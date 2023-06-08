import React, {Fragment, useState} from 'react';
import { Route, Routes } from "react-router-dom";
import './main.css';

import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Main from './pages/Home/Home';
import PageNotFound from './pages/PageNotFound/PageNotFound';

function App() {  
  return ( 
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path='*' element={<PageNotFound />}/>
    </Routes>
  );
}

export default App;
