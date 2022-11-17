// <<<<<<< HEAD
// import React, { useEffect, useRef, useState } from 'react';
// import { Buffer } from 'buffer';
// import { Web3Storage } from 'web3.storage';

// import { useAccount } from 'wagmi';
// import Navbar from './Navbar';

// import { ethers } from 'ethers';
// import MergedNFTAbi from '../contractsData/MergedNFT.json';
// import MergedNFTAddress from '../contractsData/MergedNFT-address.json';
// import FrameAbi from '../contractsData/Frame.json';
// import FrameAddress from '../contractsData/Frame-address.json';

// import { create } from 'ipfs-http-client';
// import SelectNFT from './SelectNFT';
// import SelectFrame from './SelectFrame';

// import './App.css';
// import "../index.css"

import React from 'react'
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import Unmerge from './Unmerge';
import Merge from './Merge';
import AppDetails from './AppDetails';
import Footer from './Footer';
import './App.css';


const App = () => {
  return (
    <div className="min-h-screen min-w-fit">
      <div className='gradient-bg-color'>
      <Navbar />
      <AppDetails />
      <Routes>
        <Route path='/' element={<Merge />}></Route>
        <Route path='/unmerge' element={<Unmerge />}></Route>
      </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;