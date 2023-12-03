import { Link } from 'react-router-dom';
import Button from '../../components/button/button';
import './unauthorized-page.css';

export default function UnauthorizedPage() {
  return (
    <div className='unauthorized-container'>
      <h2>Unauthorized </h2>
      <p>You are not authorized to view this page.</p>
      <p>
        Please{' '}
        <Link to='/login' className='underline-btn'>
          Login
        </Link>
        &nbsp; or &nbsp;
        <Link to='/signup' className='underline-btn'>
          Signup
        </Link>
        .
      </p>
    </div>
  );
}
