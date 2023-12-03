import React from 'react';
import { NavLink } from 'react-router-dom';
import './side-menu.css';

function SideMenu() {
  const setNavClass = ({ isActive }) => (isActive ? 'menu-item active' : 'menu-item');
  return (
    <div className='side-menu'>
      <NavLink to='/' className={setNavClass}>
        Questions
      </NavLink>
      <NavLink to='/tags' className={setNavClass}>
        Tags
      </NavLink>
    </div>
  );
}

export default SideMenu;
