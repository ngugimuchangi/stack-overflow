import globalService from '../../services/global-service';
import './feedback-card.css';

export default function FeedbackCard({ text, info, user, children }) {
  const feedbackTime = globalService.getDisplayTime(info.createdAt);
  return (
    <>
      <div className='feedback-container'>
        <div className='feedback-details'>
          <div className='feedback-text'>{info.text} </div>
          <div className='user-details'>
            <div className='user-name'>{user.username}</div>
            <div className='feedback-date'>{`${text} ${feedbackTime}`}</div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
