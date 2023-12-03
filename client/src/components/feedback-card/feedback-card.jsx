import './feedback-card.css';
import globalService from '../../services/global-service';

export default function FeedbackCard({ text, info }) {
  const feedbackTime = globalService.getDisplayTime(info.createdAt);
  return (
    <>
      <div className='feedback-container'>
        <div className='feedback-text'>{info.text}</div>
        <div className='user-details'>
          <div className='user-name'>{info.user.username}</div>
          <div className='feedback-date'>{`${text} ${feedbackTime}`}</div>
        </div>
      </div>
    </>
  );
}
