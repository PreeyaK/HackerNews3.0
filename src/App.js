import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './Menu';
import {Comments, Ask, Show, Jobs, Login, PostList} from './pages'; 
const App = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<PostList type="newstories" />} />
        <Route path="/top" element={<PostList type="topstories" />} />
        <Route path="/comments" element={<Comments /> } />
        <Route path="/ask" element={<Ask /> } />
        <Route path="/show"  element={<Show /> } />
        <Route path="/jobs" element={<Jobs /> } />
        <Route path="/login" element={<Login /> } />
      </Routes>
    </Router>
  );
};

export default App;
