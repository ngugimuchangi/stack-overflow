import { Link } from 'react-router-dom';
import Button from '../button/button';
import './user-info-card.css';
export default function UserInfoCard({ info, handleDelete, link }) {
  return (
    <li className='user-info-item'>
      <div className='user-info-card'>
        {link ? (
          <Link to={link}>
            <p> {info} </p>
          </Link>
        ) : (
          <p> {info} </p>
        )}
        <div className='button-container'>
          <Button text='Delete' classes='delete-btn' onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
}
