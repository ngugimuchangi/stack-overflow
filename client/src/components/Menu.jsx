import React from 'react';

const Menu = ({ activeLink }) => {
  return (
    <div className="menu">
      <div className={`menu-link ${activeLink === 'questions' ? 'active' : ''}`}>
        Questions
      </div>
      <div className={`menu-link ${activeLink === 'tags' ? 'active' : ''}`}>
        Tags
      </div>
    </div>
  );
};

export default Menu;
