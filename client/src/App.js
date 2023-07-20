import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import {Container} from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const NavigatePosts = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/posts', {replace: true});
  }, [navigate]);

  return null;
};
const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth = "xl">
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<NavigatePosts/>} />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" exact element={user ? <NavigatePosts/> : <Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
