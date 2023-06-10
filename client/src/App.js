
import { Route, Routes } from "react-router-dom";
// import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import './main.css';

import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Main from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import PageNotFound from './pages/PageNotFound/PageNotFound';

function App() {  
  return ( 
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path='*' element={<PageNotFound />}/>
    </Routes>
  );
}

export default App;
