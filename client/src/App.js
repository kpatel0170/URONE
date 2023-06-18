
import { Route, Routes } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
// import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import './main.css';
import 'react-toastify/dist/ReactToastify.css';

import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Main from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import SinglePost from "./pages/Post/SinglePost";
import User from "./pages/User/User";

function App() {  
  return ( 
    <>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/posts/:id" element={<SinglePost />} />
      <Route path="/:name" element={<User />} />
      <Route path='*' element={<PageNotFound />}/>
    </Routes>
    <ToastContainer />
    </>
  );
}

export default App;
