import { Link, Outlet } from 'react-router-dom';
import './auth-layout.css';

export default function AuthLayout() {
  return (
    <div className='auth-layout'>
      <Link to='/'>
        <img className='logo' src='src/assets/logo.svg' alt='logo' width='100' height='100' />
      </Link>
      <Outlet />
    </div>
  );
}
