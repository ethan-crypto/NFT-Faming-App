import React from 'react'
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import Unmerge from './Unmerge';
import Merge from './Merge';
import AppDetails from './AppDetails';
import Footer from './Footer';
import Story from './Story'
import './App.css';


const App = () => {
  return (
    <div className="w-full min-h-screen min-w-fit">
      {/* <div className='gradient-bg-color'> */}
      <div className='bg-black'>
      <Navbar />
      <AppDetails />
      <Story />
      <Routes>
        <Route path='/story' element={<Story />}></Route>
        <Route path='/' element={<Merge />}></Route>
        <Route path='/unmerge' element={<Unmerge />}></Route>
      </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;