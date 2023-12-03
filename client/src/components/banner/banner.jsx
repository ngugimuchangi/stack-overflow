import React from 'react';
import { Link } from 'react-router-dom';
import './banner.css';
import Search from '../search/search';

function Banner() {
  return (
    <header>
      <div className='header-content'>
        <Link to='/' className='logo-and-text'>
          <img src='src/assets/logo.svg' alt='logo' className='logo' />
          <h1>Fake Stack Overflow</h1>
        </Link>
        <Search />
      </div>
    </header>
  );
}

export default Banner;
