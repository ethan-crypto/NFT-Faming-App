import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import "../index.css"
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    // <nav className='/* navbar flex w-full navbar-expand-lg */'>
    <nav className='w-full navbar flex md:justify-center justify-between items-center p-4'>
        <div className='container-fluid'>
          <a className="text-gradient font-medium navbar-brand shadow-md px-2" href=''>
            NFT Merger
          </a>
          <div>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
                {/* <Link to='/' className='nav-link'>MintBayc</Link> */}
              </li>
            </ul>
            <div className="">
            <ConnectButton/>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar