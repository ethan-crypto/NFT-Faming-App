import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import "../index.css"
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
// <<<<<<< HEAD
//     // <nav className='/* navbar flex w-full navbar-expand-lg */'>
//         <div className='container-fluid'>
//             NFT Merger
//           </a>
//           <div>
//             <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
//             <li className='nav-item'>
//                 {/* <Link to='/' className='nav-link'>MintBayc</Link> */}
//               </li>
//             </ul>
//             <div className="">
//             <ConnectButton/>
//             </div>
//           </div>
// =======
    <nav className='w-full navbar flex md:justify-center justify-between items-center p-4'>
      <div className='container-fluid'>
      <a className="text-gradient font-medium navbar-brand shadow-md px-2" href='#'>
          NFT Merger
        </a>
        {/* <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button> */}
        <div className='flex  flex-row item-center justify-between'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link to='/' className='nav-link'>
                Home
            </Link>
            </li>
            <li className='nav-item'>
              <Link to='/unmerge' className='nav-link'>
                Unmerge
              </Link>
            </li>
          </ul>
          <ConnectButton></ConnectButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;