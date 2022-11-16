import './App.css';

import React from 'react'
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import Unmerge from './Unmerge';
import Merge from './Merge';

const App = () => {
  


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Merge />}></Route>
        <Route path='/unmerge' element={<Unmerge />}></Route>
      </Routes>
     
    </div>
  );
};

export default App;