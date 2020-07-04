import React from 'react';
import {ReactComponent as Logo} from "./Logo.svg";
import './Navbar.scss'
import {Link} from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/'>
        <Logo/>
      </Link>
      <ul>
        <li className='navbar__item'>
          <Link className='navbar__item--link' to='/'>HOME</Link>
        </li>
        <li className='navbar__item'>
          <Link className='navbar__item--link' to="/about">ABOUT</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar