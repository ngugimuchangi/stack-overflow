import Button from '../button/button';
import './user-info-card.css';
export default function UserInfoCard({ info, id, index, handleDelete }) {
  return (
    <li className='user-info-item'>
      <div className='user-info-card'>
        <p> {info} </p>
        <div className='button-container'>
          <Button text='Delete' classes='delete-btn' onClick={() => handleDelete(id, index)} />
        </div>
      </div>
    </li>
  );
}
