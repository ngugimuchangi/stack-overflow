import React from 'react';

function Menu({ activeLink }) {
  return (
    <div className='menu'>
      <a href='/questions' className={activeLink === 'questions' ? 'active' : ''}>
        Questions
      </a>
      <a href='/tags' className={activeLink === 'tags' ? 'active' : ''}>
        Tags
      </a>
    </div>
  );
}

export default Menu;
