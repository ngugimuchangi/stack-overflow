import { Link } from 'react-router-dom';
import Button from '../../components/button/button';
import './not-found-page.css';

export default function NotFoundPage() {
  return (
    <div className='not-found-container'>
      <h2>Page not found</h2>
      <p>
        The page you are looking for might have been removed, had its name changed or is temporarily
        unavailable.
      </p>
      <Link to='/'>
        <Button text='Go to Homepage' classes='action-btn' />
      </Link>
    </div>
  );
}
