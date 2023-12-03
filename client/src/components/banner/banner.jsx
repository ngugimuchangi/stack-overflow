import React from 'react';
import { Link } from 'react-router-dom';
import './banner.css';
import Search from '../search/search';

function Banner() {
  return (
    <header>
      <div className='header-content'>
        <Link to='/' className='header-text'>
          <h1>Fake Stack Overflow</h1>
        </Link>
        <Search />
      </div>
    </header>
  );
}

export default Banner;
