import Banner from '../../components/banner/banner';
import SideMenu from '../../components/side-menu/side-menu';
import { Link } from 'react-router-dom';
import Button from '../../components/button/button';
import { Outlet } from 'react-router-dom';
import './base-layout.css';

export default function BaseLayout() {
  return (
    <div className='base-layout'>
      <Banner />
      <div className='base-layout-content'>
        <SideMenu />
        <div className='base-layout-main-content'>
          <div className='base-layout-action-btn-container'>
            <Link to='/login' className='base-layout-action-btn'>
              <Button text='Login' classes='clear-btn' />
            </Link>
            <Link to='/new-question' className='base-layout-action-btn'>
              <Button text='Ask Question' classes='action-btn' />
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
